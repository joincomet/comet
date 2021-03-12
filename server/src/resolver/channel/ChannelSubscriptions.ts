import { Resolver, Subscription } from 'type-graphql'
import { SubscriptionTopic } from '@/types'

@Resolver()
export class ChannelSubscriptions {
  @Subscription({
    topics: SubscriptionTopic.RefetchChannels,
    filter: ({ payload: serverId, context: { user, em } }) =>
      user.hasJoinedServer(em, serverId)
  })
  refetchChannels() {
    return true
  }
}
