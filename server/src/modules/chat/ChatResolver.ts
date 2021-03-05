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
import { Context } from '@/types/Context'
import { QueryOrder } from '@mikro-orm/core'
import { GetMessagesResponse, GetMessagesArgs } from '@/modules/chat'
import { EntityManager } from '@mikro-orm/postgresql'
import { scrapeMetadata } from '@/util/metascraper/scrapeMetadata'
import { SubscriptionFilter } from '@/modules/subscriptions/SubscriptionFilter'
import { SubscriptionTopic } from '@/modules/subscriptions'

const filter = ({
  payload: { channel },
  context: { user }
}: SubscriptionFilter<ChatMessage>) =>
  channel.server
    ? channel.server.users.contains(user)
    : channel.group.users.contains(user)

@Resolver()
export class ChatResolver {
  @Authorized()
  @Query(() => GetMessagesResponse)
  async getMessages(
    @Args() { channelId, page, pageSize }: GetMessagesArgs,
    @Ctx() { user, em }: Context
  ) {
    const channel = await em.findOne(ChatChannel, channelId, [
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
          ChatMessage,
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
    messageCreated: Publisher<ChatMessage>,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<ChatMessage>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const err = new Error('You do not have access to this channel')
    const channel = await em.findOne(ChatChannel, channelId, [
      'group.users',
      'server.users'
    ])
    if (!channel) throw new Error('Invalid channel ID')
    if (channel.group && !channel.group.users.contains(user)) throw err
    else if (channel.server && !channel.server.users.contains(user)) throw err

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

  @Authorized()
  @Mutation(() => Boolean)
  async editMessage(
    @Arg('text') text: string,
    @Arg('messageId', () => ID) messageId: string,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<ChatMessage>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    if (!text) throw new Error('Text cannot be empty')
    const message = await em.findOne(ChatMessage, messageId, ['author'])
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
    messageDeleted: Publisher<ChatMessage>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const message = await em.findOne(ChatMessage, messageId, ['author'])
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
    messageUpdated: Publisher<ChatMessage>,
    message: ChatMessage
  ) {
    const linkRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi
    const links = message.text.match(linkRegex)
    message.linkEmbeds = []
    for (const link of links) {
      const meta = await scrapeMetadata(link)
      if (meta) message.linkEmbeds.push(meta)
    }
    await em.persistAndFlush(message)
    await messageUpdated(message)
  }

  // --- Subscriptions ---

  @Authorized()
  @Subscription(() => ChatMessage, {
    topics: SubscriptionTopic.MessageCreated,
    filter
  })
  messageCreated(@Root() message: ChatMessage) {
    return message
  }

  @Authorized()
  @Subscription(() => ChatMessage, {
    topics: SubscriptionTopic.MessageUpdated,
    filter
  })
  messageUpdated(@Root() message: ChatMessage) {
    return message
  }

  @Authorized()
  @Subscription(() => ID, {
    topics: SubscriptionTopic.MessageDeleted,
    filter
  })
  messageDeleted(@Root() message: ChatMessage) {
    return message.id
  }
}
