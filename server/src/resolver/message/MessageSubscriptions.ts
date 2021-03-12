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
    'group.users'
  ])
  return channel.server
    ? user.hasChannelPermission(
        em,
        ChannelPermission.ViewChannel,
        ServerPermission.ViewChannels,
        channel.id
      )
    : channel.group.users.contains(user)
}

@Resolver()
export class MessageSubscriptions {
  @Authorized()
  @Subscription(() => ChatMessage, {
    topics: SubscriptionTopic.MessageSent,
    filter,
    description:
      'Published to all users with permission to view message when a message is sent'
  })
  messageSent(@Root() message: ChatMessage) {
    return message
  }

  @Authorized()
  @Subscription(() => ChatMessage, {
    topics: SubscriptionTopic.MessageUpdated,
    filter,
    description:
      'Published to all users with permission to view message when a message is updated (edited or embeds fetched)'
  })
  messageEdited(@Root() message: ChatMessage) {
    return message
  }

  @Authorized()
  @Subscription(() => ID, {
    topics: SubscriptionTopic.MessageRemoved,
    filter,
    description:
      'Published to all users with permission to view message when a message is deleted or removed'
  })
  messageDeleted(@Root() message: ChatMessage) {
    return message.id
  }
}
