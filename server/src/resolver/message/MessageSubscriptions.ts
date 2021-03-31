import { Authorized, Ctx, ID, Resolver, Root, Subscription } from 'type-graphql'
import { Message } from '@/entity'
import {
  SubscriptionFilter,
  SubscriptionTopic,
  ChannelPermission,
  ServerPermission,
  Context
} from '@/types'
import {
  MessageRemovedResponse,
  MessageSentPayload
} from '@/resolver/message/types'
import { MessageSentResponse } from '@/resolver/message/types/MessageSentResponse'

const filter = async ({
  payload: { messageId },
  context: { user, em }
}: SubscriptionFilter<MessageSentPayload>) => {
  const message = await em.findOneOrFail(Message, messageId, [
    'channel.server',
    'group.users',
    'toUser',
    'author'
  ])

  if (message.channel) {
    return user.hasChannelPermission(
      em,
      message.channel,
      ChannelPermission.ViewChannel
    )
  } else if (message.group) return message.group.users.contains(user)
  else if (message.toUser)
    return message.toUser === user || message.author === user
  else return false
}

@Resolver()
export class MessageSubscriptions {
  @Authorized()
  @Subscription(() => MessageSentResponse, {
    topics: SubscriptionTopic.MessageSent,
    filter,
    description:
      'Published to all users with permission to view message when a message is sent'
  })
  async messageSent(
    @Ctx() { em, user }: Context,
    @Root()
    { messageId, fromUserId, toUserId, groupId, channelId }: MessageSentPayload
  ): Promise<MessageSentResponse> {
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
    } as MessageSentResponse
  }

  @Authorized()
  @Subscription(() => MessageSentResponse, {
    topics: SubscriptionTopic.MessageUpdated,
    filter,
    description:
      'Published to all users with permission to view message when a message is updated (edited or embeds fetched)'
  })
  async messageUpdated(
    @Ctx() { em, user }: Context,
    @Root()
    { messageId, fromUserId, toUserId, groupId, channelId }: MessageSentPayload
  ): Promise<MessageSentResponse> {
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
    } as MessageSentResponse
  }

  @Authorized()
  @Subscription(() => MessageRemovedResponse, {
    topics: SubscriptionTopic.MessageRemoved,
    filter,
    description:
      'Published to all users with permission to view message when a message is deleted or removed'
  })
  messageRemoved(
    @Ctx() { em, user }: Context,
    @Root()
    { messageId, fromUserId, toUserId, groupId, channelId }: MessageSentPayload
  ): MessageRemovedResponse {
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
    } as MessageRemovedResponse
  }
}
