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
import { Topic } from '@/chat/Topic'
import { NewMessagesArgs } from '@/chat/NewMessagesArgs'
import { Context } from '@/Context'
import { QueryOrder } from '@mikro-orm/core'
import { MessagesResponse } from '@/chat/MessagesResponse'

@Resolver()
export class ChatResolver {
  @Authorized()
  @Query(() => MessagesResponse)
  async messages(
    @Args() { channelId, page, pageSize }: NewMessagesArgs,
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
    @PubSub(Topic.NewMessage)
    notifyAboutNewMessage: Publisher<Message>,
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
    await notifyAboutNewMessage(message)

    return true
  }

  @Authorized()
  @Subscription(() => Message, {
    topics: Topic.NewMessage,
    filter: ({
      payload,
      args
    }: ResolverFilterData<Message, NewMessagesArgs>) => {
      return payload.channel.id === args.channelId
    }
  })
  newMessage(
    @Root() newMessage: Message,
    @Args() { channelId }: NewMessagesArgs
  ): Message {
    return newMessage
  }
}
