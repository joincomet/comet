import { Authorized, ID, Resolver, Root, Subscription } from 'type-graphql'
import { ChatMessage } from '@/entity'
import { SubscriptionFilter, SubscriptionTopic } from '@/types'
import { ChannelPermission } from '@/types/ChannelPermission'
import { ServerPermission } from '@/types/ServerPermission'

const filter = async ({
  payload: { channel },
  context: { user, em }
}: SubscriptionFilter<ChatMessage>) => {
  await em.populate(channel, ['group.users'])
  return channel.server
    ? user.hasChannelPermission(
        em,
        ChannelPermission.ViewChannel,
        ServerPermission.ViewChannels,
        channel
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
