import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription
} from 'type-graphql'
import { ChatMessage, ChatChannel } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'
import { GetMessagesResponse, GetMessagesArgs } from '@/resolver/chat'
import { EntityManager } from '@mikro-orm/postgresql'
import { scrapeMetadata } from '@/util/metascraper'
import {
  SubscriptionTopic,
  SubscriptionFilter,
  Context,
  PaginationArgs
} from '@/types'
import { UserJoinServer } from '@/entity/UserJoinServer'
import { ServerPermission } from '@/types/ServerPermission'

@Resolver()
export class ChatMutations {
  @Authorized(ServerPermission.SendMessages)
  @Mutation(() => Boolean)
  async createMessage(
    @Arg('text') text: string,
    @Arg('channelId', () => ID) channelId: string,
    @PubSub(SubscriptionTopic.MessageCreated)
    messageCreated: Publisher<ChatMessage>,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<ChatMessage>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const err = new Error('You do not have access to this channel')
    const channel = await em.findOneOrFail(ChatChannel, channelId)
    if (channel.group && !channel.group.users.contains(user)) throw err
    else if (channel.server) {
      await em.findOneOrFail(
        UserJoinServer,
        { user, server: channel.server },
        {
          failHandler: () =>
            new Error("You have not joined this channel's server.")
        }
      )
    }

    const message = em.create(ChatMessage, {
      text,
      channel,
      author: user
    })

    await em.persistAndFlush(message)
    await messageCreated(message)

    this.getLinkMetas(em, messageUpdated, message)

    return true
  }

  @Authorized(ServerPermission.SendMessages)
  @Mutation(() => Boolean)
  async updateMessage(
    @Arg('text') text: string,
    @Arg('messageId', () => ID) messageId: string,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<ChatMessage>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    if (!text) throw new Error('Text cannot be empty')
    const message = await em.findOneOrFail(ChatMessage, messageId)
    if (message.author !== user)
      throw new Error('You are not the author of this message')

    message.text = text
    await em.persistAndFlush(message)
    await messageUpdated(message)

    this.getLinkMetas(em, messageUpdated, message)

    return true
  }

  @Authorized(ServerPermission.SendMessages)
  @Mutation(() => Boolean)
  async deleteMessage(
    @Arg('messageId', () => ID) messageId: string,
    @PubSub(SubscriptionTopic.MessageDeleted)
    messageDeleted: Publisher<ChatMessage>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const message = await em.findOneOrFail(ChatMessage, messageId, ['author'])
    if (message.author.id !== user.id)
      throw new Error('You are not the author of this message')

    message.deleted = true
    await em.persistAndFlush(message)
    await messageDeleted(message)
    return true
  }

  async getLinkMetas(
    em: EntityManager,
    messageUpdated: Publisher<ChatMessage>,
    message: ChatMessage
  ) {
    const linkRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi
    const links = message.text.match(linkRegex)
    message.linkMetadatas = []
    for (const link of links) {
      const meta = await scrapeMetadata(link)
      if (meta) message.linkMetadatas.push(meta)
    }
    await em.persistAndFlush(message)
    await messageUpdated(message)
  }
}
