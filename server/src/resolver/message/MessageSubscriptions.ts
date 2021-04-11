import { Authorized, Ctx, ID, Resolver, Root, Subscription } from 'type-graphql'
import { Message, User } from '@/entity'
import { Context, SubscriptionTopic } from '@/types'
import { MessageResponse } from '@/resolver/message/subscriptions/MessageResponse'
import { canViewMessageFilter } from '@/resolver/message/subscriptions/canViewMessageFilter'
import { typingFilter } from '@/resolver/message/subscriptions/typingFilter'
import { currentUserFilter } from '@/util/currentUserFilter'
import {
  DmPayload,
  MessageDeletedResponse,
  MessagePayload
} from '@/resolver/message/subscriptions'
import { TypingPayload } from '@/resolver/message/mutations'

@Resolver()
export class MessageSubscriptions {
  @Authorized()
  @Subscription(() => MessageResponse, {
    topics: SubscriptionTopic.MessageSent,
    filter: canViewMessageFilter,
    description:
      'Published to all users with permission to view message when a message is sent'
  })
  async messageSent(
    @Ctx() { em, user }: Context,
    @Root()
    {
      messageId,
      fromUserId,
      toUserId,
      groupId,
      channelId,
      serverId
    }: MessagePayload
  ): Promise<MessageResponse> {
    const userId = toUserId
      ? toUserId === user.id
        ? fromUserId
        : toUserId
      : null
    return {
      userId,
      groupId,
      channelId,
      serverId,
      message: await em.findOneOrFail(Message, messageId, ['author'])
    }
  }

  @Authorized()
  @Subscription(() => MessageResponse, {
    topics: SubscriptionTopic.MessageUpdated,
    filter: canViewMessageFilter,
    description:
      'Published to all users with permission to view message when a message is updated (edited or embeds fetched)'
  })
  async messageUpdated(
    @Ctx() { em, user }: Context,
    @Root()
    { messageId, fromUserId, toUserId, groupId, channelId }: MessagePayload
  ): Promise<MessageResponse> {
    const userId = toUserId
      ? toUserId === user.id
        ? fromUserId
        : toUserId
      : null
    return {
      userId,
      groupId,
      channelId,
      message: await em.findOneOrFail(Message, messageId, ['author'])
    } as MessageResponse
  }

  @Authorized()
  @Subscription(() => MessageDeletedResponse, {
    topics: SubscriptionTopic.MessageDeleted,
    filter: canViewMessageFilter,
    description:
      'Published to all users with permission to view message when a message is deleted or removed'
  })
  messageDeleted(
    @Ctx() { user }: Context,
    @Root()
    { messageId, fromUserId, toUserId, groupId, channelId }: MessagePayload
  ): MessageDeletedResponse {
    const userId = toUserId
      ? toUserId === user.id
        ? fromUserId
        : toUserId
      : null
    return {
      userId,
      groupId,
      channelId,
      messageId
    }
  }

  @Authorized()
  @Subscription(() => String, {
    topics: SubscriptionTopic.Typing,
    filter: typingFilter,
    description:
      'Published to all users looking at messages when a user starts typing'
  })
  userStartedTyping(
    @Root()
    { username }: TypingPayload
  ): string {
    return username
  }

  @Authorized()
  @Subscription(() => User, {
    topics: SubscriptionTopic.DmRead,
    filter: currentUserFilter
  })
  async dmRead(
    @Ctx() { em }: Context,
    @Root() { toUserId }: DmPayload
  ): Promise<User> {
    return em.findOneOrFail(User, toUserId)
  }

  @Authorized()
  @Subscription(() => User, {
    topics: SubscriptionTopic.DmOpened,
    filter: currentUserFilter
  })
  async dmOpened(
    @Ctx() { em }: Context,
    @Root() { toUserId }: DmPayload
  ): Promise<User> {
    return em.findOneOrFail(User, toUserId)
  }

  @Authorized()
  @Subscription(() => ID, {
    topics: SubscriptionTopic.DmClosed,
    filter: currentUserFilter
  })
  dmClosed(@Root() { toUserId }: DmPayload): string {
    return toUserId
  }
}
