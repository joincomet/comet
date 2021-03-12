import { Authorized, ID, Resolver, Root, Subscription } from 'type-graphql'
import { ChatChannel, ChatMessage } from '@/entity'
import {
  SubscriptionFilter,
  SubscriptionTopic,
  ChannelPermission,
  ServerPermission
} from '@/types'

const filter = async ({
  payload: channelId,
  context: { user, em }
}: SubscriptionFilter<ChatMessage>) => {
  const channel = await em.findOneOrFail(ChatChannel, channelId, [
    'server',
    'group.users',
    'directMessage.user1',
    'directMessage.user2'
  ])

  if (channel.server)
    return user.hasChannelPermission(
      em,
      ChannelPermission.ViewChannel,
      ServerPermission.ViewChannels,
      channel.id
    )
  else if (channel.group) return channel.group.users.contains(user)
  else if (channel.directMessage)
    return (
      channel.directMessage.user1 === user ||
      channel.directMessage.user2 === user
    )
  else return false
}

@Resolver()
export class MessageSubscriptions {
  @Authorized()
  @Subscription(() => ChatMessage, {
    topics: SubscriptionTopic.MessageReceived,
    filter,
    description:
      'Published to all users with permission to view message when a message is sent'
  })
  messageReceived(@Root() message: ChatMessage) {
    return message
  }

  @Authorized()
  @Subscription(() => ChatMessage, {
    topics: SubscriptionTopic.MessageUpdated,
    filter,
    description:
      'Published to all users with permission to view message when a message is updated (edited or embeds fetched)'
  })
  messageUpdated(@Root() message: ChatMessage) {
    return message
  }

  @Authorized()
  @Subscription(() => ID, {
    topics: SubscriptionTopic.MessageRemoved,
    filter,
    description:
      'Published to all users with permission to view message when a message is deleted or removed'
  })
  messageRemoved(@Root() message: ChatMessage) {
    return message.id
  }
}
