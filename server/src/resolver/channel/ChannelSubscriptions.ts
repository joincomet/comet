import { Resolver, Subscription } from 'type-graphql'
import { SubscriptionTopic } from '@/types'

@Resolver()
export class ChannelSubscriptions {
  @Subscription(() => Boolean, {
    topics: SubscriptionTopic.RefetchServerChannels,
    filter: ({ payload: serverId, context: { user, em } }) =>
      user.hasJoinedServer(em, serverId)
  })
  refetchServerChannels() {
    return true
  }
}
