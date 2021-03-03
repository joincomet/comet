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
  ResolverFilterData,
  Root,
  Subscription
} from 'type-graphql'
import { Message } from '@/chat/Message.entity'
import { Channel } from '@/chat/Channel.entity'
import { MessagesSubscriptionArgs } from '@/chat/MessagesSubscriptionArgs'
import { Context } from '@/Context'
import { QueryOrder } from '@mikro-orm/core'
import { MessagesResponse } from '@/chat/MessagesResponse'
import { EntityManager } from '@mikro-orm/postgresql'
import { scrapeMetadata } from '@/metascraper/scrapeMetadata'
import { MessagesArgs } from '@/chat/MessagesArgs'
import { MESSAGE_CREATED, MESSAGE_UPDATED } from '@/subscriptions'

@Resolver()
export class ChatResolver {
  @Authorized()
  @Query(() => MessagesResponse)
  async messages(
    @Args() { channelId, page, pageSize }: MessagesArgs,
    @Ctx() { userId, em }: Context
  ) {
    const channel = await em.findOne(Channel, channelId, [
      'group.users',
      'planet.users'
    ])
    if (!channel) throw new Error(`Channel ${channelId} does not exist`)
    const err = new Error(`You do not have access to this channel`)
    if (channel.group) {
      const group = channel.group
      const users = group.users
      if (
        !users
          .getItems()
          .map(u => u.id)
          .includes(userId)
      )
        throw err
    } else if (channel.planet) {
      const planet = channel.planet
      const users = planet.users
      if (
        !users
          .getItems()
          .map(u => u.id)
          .includes(userId)
      )
        throw err
    }

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
    @PubSub(SubscriptionTopic.NewMessage)
    notifyNewMessage: Publisher<Message>,
    @PubSub(SubscriptionTopic.UpdateMessage)
    notifyUpdateMessage: Publisher<Message>,
    @Ctx() { userId, em }: Context
  ): Promise<boolean> {
    const err = new Error('You do not have access to this channel')
    const channel = await em.findOne(Channel, channelId, [
      'group.users',
      'planet.users'
    ])
    if (!channel) throw new Error('Invalid channel ID')
    if (
      channel.group &&
      !channel.group.users
        .getItems()
        .map(u => u.id)
        .includes(userId)
    )
      throw err
    else if (
      channel.planet &&
      !channel.planet.users
        .getItems()
        .map(u => u.id)
        .includes(userId)
    )
      throw err

    const message = em.create(Message, {
      text,
      channel,
      author: userId
    })

    await em.persistAndFlush(message)
    await notifyNewMessage(message)

    this.getLinkMetas(em, notifyUpdateMessage, message)

    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async editMessage(
    @Arg('text') text: string,
    @Arg('messageId', () => ID) messageId: string,
    @PubSub(MESSAGE_UPDATED)
    notifyUpdateMessage: Publisher<Message>,
    @Ctx() { userId, em }: Context
  ): Promise<boolean> {
    if (!text) throw new Error('Text cannot be empty')
    const message = await em.findOne(Message, messageId, ['author'])
    if (!message) throw new Error('Invalid message ID')
    if (message.author.id !== userId)
      throw new Error('You are not the author of this message')

    message.text = text
    await em.persistAndFlush(message)
    await notifyUpdateMessage(message)

    this.getLinkMetas(em, notifyUpdateMessage, message)

    return true
  }

  async getLinkMetas(
    em: EntityManager,
    notifyUpdateMessage: Publisher<Message>,
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
    await notifyUpdateMessage(message)
  }

  @Authorized()
  @Subscription(() => Message, {
    topics: MESSAGE_CREATED,
    filter: ({
      payload,
      args
    }: ResolverFilterData<Message, MessagesSubscriptionArgs>) => {
      return payload.channel.id === args.channelId
    }
  })
  newMessage(
    @Root() newMessage: Message,
    @Args() { channelId }: MessagesSubscriptionArgs
  ): Message {
    return newMessage
  }

  @Authorized()
  @Subscription(() => Message, {
    topics: MESSAGE_UPDATED,
    filter: ({
      payload,
      args
    }: ResolverFilterData<Message, MessagesSubscriptionArgs>) => {
      return payload.channel.id === args.channelId
    }
  })
  updateMessage(
    @Root() updatedMessage: Message,
    @Args() { channelId }: MessagesSubscriptionArgs
  ): Message {
    return updatedMessage
  }
}
