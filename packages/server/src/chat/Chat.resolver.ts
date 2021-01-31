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
import { User } from '@/user/User.entity'
import { ChatMessage } from '@/chat/ChatMessage.entity'
import { ChatGroup } from '@/chat/ChatGroup.entity'
import { ChatChannel } from '@/chat/ChatChannel.entity'
import { Topic } from '@/chat/Topic'
import { MessageInput } from '@/chat/MessageInput'
import { NewMessagesArgs } from '@/chat/NewMessagesArgs'
import { Context } from '@/Context'
import { Planet } from '@/planet/Planet.entity'
import { wrap } from '@mikro-orm/core'

@Resolver()
export class ChatResolver {
  @Authorized()
  @Query(() => [ChatMessage])
  async messages(
    @Args() { channelId, page, pageSize }: NewMessagesArgs,
    @Ctx() { userId, em }: Context
  ) {
    const channel = await em.findOne(ChatChannel, channelId, [
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

    return em.find(
      ChatMessage,
      { removed: false, deleted: false, channel: { id: channelId } },
      { limit: pageSize, offset: page * pageSize }
    )
  }

  @Authorized()
  @Mutation(() => Boolean)
  async sendMessage(
    @Arg('message') { text, channelId }: MessageInput,
    @PubSub(Topic.NewMessage)
    notifyAboutNewMessage: Publisher<ChatMessage>,
    @Ctx() { userId, em }: Context
  ): Promise<boolean> {
    const err = new Error('You do not have access to this channel')
    const channel = await em.findOne(ChatChannel, channelId, [
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

    const message = em.create(ChatMessage, {
      text,
      channel,
      author: userId
    })

    await em.persistAndFlush(message)
    await notifyAboutNewMessage(message)

    return true
  }

  @Authorized()
  @Subscription(() => ChatMessage, {
    topics: Topic.NewMessage,
    filter: ({
      payload,
      args
    }: ResolverFilterData<ChatMessage, NewMessagesArgs>) => {
      return payload.channel.id === args.channelId
    }
  })
  newMessages(
    @Root() newMessage: ChatMessage,
    @Args() { channelId }: NewMessagesArgs
  ): ChatMessage {
    return newMessage
  }
}
