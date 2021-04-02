import {
  Args,
  Authorized,
  Ctx,
  Resolver,
  Root,
  Subscription
} from 'type-graphql'
import { Channel, Group, Message } from '@/entity'
import {
  SubscriptionFilter,
  SubscriptionTopic,
  ChannelPermission,
  Context
} from '@/types'
import {
  MessageRemovedResponse,
  MessageSentPayload
} from '@/resolver/message/types'
import { MessageSentResponse } from '@/resolver/message/types/MessageSentResponse'
import { TypingPayload } from '@/resolver/message/types/TypingPayload'
import { TypingArgs } from '@/resolver/message/types/TypingArgs'

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

  @Authorized()
  @Subscription(() => String, {
    topics: SubscriptionTopic.Typing,
    /*filter: async ({
      payload: {
        channelId: typingChannelId,
        groupId: typingGroupId,
        userId: typingUserId
      },
      context: { user, em },
      args: { channelId, groupId, userId }
    }: SubscriptionFilter<TypingPayload>) => {
      console.log('------------------------------------')
      console.log({
        channelId,
        typingChannelId,
        groupId,
        typingGroupId,
        userId,
        typingUserId
      })
      console.log('------------------------------------')
      if (typingChannelId && channelId === typingChannelId) {
        const channel = await em.findOneOrFail(Channel, typingChannelId)
        return user.hasChannelPermission(
          em,
          channel,
          ChannelPermission.ViewChannel
        )
      } else if (typingGroupId && groupId === typingGroupId) {
        const group = await em.findOneOrFail(Group, typingGroupId)
        return group.users.contains(user)
      } else return typingUserId && userId === typingUserId
    },*/
    description:
      'Published to all users looking at messages when a user starts typing'
  })
  userStartedTyping(
    @Root()
    { name }: TypingPayload,
    @Args() { channelId, groupId, userId }: TypingArgs
  ): string {
    console.log({ channelId, groupId, userId })
    return name
  }
}
