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
  Root,
  Subscription
} from 'type-graphql'
import { ChatMessage, ChatChannel } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'
import { GetMessagesResponse, GetMessagesArgs } from '@/resolver/chat'
import { EntityManager } from '@mikro-orm/postgresql'
import { scrapeMetadata } from '@/util/metascraper'
import {
  SubscriptionTopic,
  SubscriptionFilter,
  Context,
  PaginationArgs
} from '@/types'

const filter = ({
  payload: { channel },
  context: { user }
}: SubscriptionFilter<ChatMessage>) =>
  channel.server
    ? channel.server.users.contains(user)
    : channel.group.users.contains(user)

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
