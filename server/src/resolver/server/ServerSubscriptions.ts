import { Authorized, Resolver, Subscription } from 'type-graphql'
import { Server } from '@/entity'
import { SubscriptionTopic } from '@/types'

@Resolver(() => Server)
export class ServerSubscriptions {
  @Authorized()
  @Subscription({
    topics: SubscriptionTopic.RefetchServers,
    filter: ({ payload: userId, context: { user } }) => userId === user.id
  })
  refetchServers() {
    return true
  }

  @Authorized()
  @Subscription({
    topics: SubscriptionTopic.RefetchServersServerRemoved,
    filter: ({ payload: serverId, context: { user, em } }) =>
      user.hasJoinedServer(em, serverId)
  })
  refetchServersServerRemoved() {
    return true
  }
}
