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
import { Message } from '@/chat/Message.entity'
import { Channel } from '@/chat/Channel.entity'
import { Context } from '@/types/Context'
import { QueryOrder } from '@mikro-orm/core'
import { MessagesResponse } from '@/chat/MessagesResponse'
import { EntityManager } from '@mikro-orm/postgresql'
import { scrapeMetadata } from '@/metascraper/scrapeMetadata'
import { MessagesArgs } from '@/chat/MessagesArgs'
import { Filter } from '@/types/Filter'
import { SubscriptionTopic } from '@/subscriptions'

const filter = ({ payload: { channel }, context: { user } }: Filter<Message>) =>
  channel.server
    ? channel.server.users.contains(user)
    : channel.group.users.contains(user)

@Resolver()
export class ChatResolver {
  @Authorized()
  @Query(() => MessagesResponse)
  async getMessages(
    @Args() { channelId, page, pageSize }: MessagesArgs,
    @Ctx() { user, em }: Context
  ) {
    const channel = await em.findOne(Channel, channelId, [
      'group.users',
      'server.users'
    ])
    if (!channel) throw new Error(`Channel ${channelId} does not exist`)
    const err = new Error(`You do not have access to this channel`)
    if (channel.group && !channel.group.users.contains(user)) throw err
    else if (channel.server && !channel.server.users.contains(user)) throw err

    return {
      messages: (
        await em.find(
          Message,
          { removed: false, deleted: false, channel: { id: channelId } },
          {
            limit: pageSize,
            offset: page * pageSize,
            orderBy: { createdAt: QueryOrder.DESC }
          }
        )
      ).reverse(),
      page,
      nextPage: page + 1
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async sendMessage(
    @Arg('text') text: string,
    @Arg('channelId', () => ID) channelId: string,
    @PubSub(SubscriptionTopic.MessageCreated)
    messageCreated: Publisher<Message>,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<Message>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const err = new Error('You do not have access to this channel')
    const channel = await em.findOne(Channel, channelId, [
      'group.users',
      'server.users'
    ])
    if (!channel) throw new Error('Invalid channel ID')
    if (channel.group && !channel.group.users.contains(user)) throw err
    else if (channel.server && !channel.server.users.contains(user)) throw err

    const message = em.create(Message, {
      text,
      channel,
      author: user
    })

    await em.persistAndFlush(message)
    await messageCreated(message)

    this.getLinkMetas(em, messageUpdated, message)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async editMessage(
    @Arg('text') text: string,
    @Arg('messageId', () => ID) messageId: string,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<Message>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    if (!text) throw new Error('Text cannot be empty')
    const message = await em.findOne(Message, messageId, ['author'])
    if (!message) throw new Error('Invalid message ID')
    if (message.author.id !== user.id)
      throw new Error('You are not the author of this message')

    message.text = text
    await em.persistAndFlush(message)
    await messageUpdated(message)

    this.getLinkMetas(em, messageUpdated, message)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteMessage(
    @Arg('messageId', () => ID) messageId: string,
    @PubSub(SubscriptionTopic.MessageDeleted)
    messageDeleted: Publisher<Message>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const message = await em.findOne(Message, messageId, ['author'])
    if (!message) throw new Error('Invalid message ID')
    if (message.author.id !== user.id)
      throw new Error('You are not the author of this message')

    message.deleted = true
    await em.persistAndFlush(message)
    await messageDeleted(message)
    return true
  }

  async getLinkMetas(
    em: EntityManager,
    messageUpdated: Publisher<Message>,
    message: Message
  ) {
    const linkRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi
    const links = message.text.match(linkRegex)
    message.metas = []
    for (const link of links) {
      const meta = await scrapeMetadata(link)
      if (meta) message.metas.push(meta)
    }
    await em.persistAndFlush(message)
    await messageUpdated(message)
  }

  // --- Subscriptions ---

  @Authorized()
  @Subscription(() => Message, {
    topics: SubscriptionTopic.MessageCreated,
    filter
  })
  messageCreated(@Root() message: Message) {
    return message
  }

  @Authorized()
  @Subscription(() => Message, {
    topics: SubscriptionTopic.MessageUpdated,
    filter
  })
  messageUpdated(@Root() message: Message) {
    return message
  }

  @Authorized()
  @Subscription(() => ID, {
    topics: SubscriptionTopic.MessageDeleted,
    filter
  })
  messageDeleted(@Root() message: Message) {
    return message.id
  }
}
