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
export class ChatSubscriptions {
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
