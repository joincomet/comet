import { Authorized, Ctx, ID, Resolver, Root, Subscription } from 'type-graphql'
import { Message } from '@/entity'
import {
  SubscriptionFilter,
  SubscriptionTopic,
  ChannelPermission,
  ServerPermission,
  Context
} from '@/types'

const filter = async ({
  payload: messageId,
  context: { user, em }
}: SubscriptionFilter<string>) => {
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
      ChannelPermission.ViewChannel,
      ServerPermission.ViewChannels
    )
  } else if (message.group) return message.group.users.contains(user)
  else if (message.toUser)
    return message.toUser === user || message.author === user
  else return false
}

@Resolver()
export class MessageSubscriptions {
  @Authorized()
  @Subscription(() => Message, {
    topics: SubscriptionTopic.MessageReceived,
    filter,
    description:
      'Published to all users with permission to view message when a message is sent'
  })
  async messageReceived(@Ctx() { em }: Context, @Root() messageId: string) {
    return em.findOneOrFail(Message, messageId, ['author'])
  }

  @Authorized()
  @Subscription(() => Message, {
    topics: SubscriptionTopic.MessageUpdated,
    filter,
    description:
      'Published to all users with permission to view message when a message is updated (edited or embeds fetched)'
  })
  async messageUpdated(@Ctx() { em }: Context, @Root() messageId: string) {
    return em.findOneOrFail(Message, messageId, ['author'])
  }

  @Authorized()
  @Subscription(() => ID, {
    topics: SubscriptionTopic.MessageRemoved,
    filter,
    description:
      'Published to all users with permission to view message when a message is deleted or removed'
  })
  messageRemoved(@Root() messageId: string) {
    return messageId
  }
}
