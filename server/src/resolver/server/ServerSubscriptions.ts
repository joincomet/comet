import { Authorized, Resolver, Subscription } from 'type-graphql'
import { Server } from '@/entity'
import { SubscriptionTopic } from '@/types'

@Resolver(() => Server)
export class ServerSubscriptions {
  @Authorized()
  @Subscription(() => Boolean, {
    topics: SubscriptionTopic.RefetchJoinedServers,
    filter: ({ payload: userId, context: { user } }) => userId === user.id
  })
  refetchJoinedServers() {
    return true
  }
}
