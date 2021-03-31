import { Authorized, Resolver, Subscription } from 'type-graphql'
import { SubscriptionTopic } from '@/types'

@Resolver()
export class ChannelSubscriptions {
  @Authorized()
  @Subscription(() => Boolean, {
    topics: SubscriptionTopic.RefetchServerChannels,
    filter: ({ payload: serverId, context: { user, em } }) => {
      return user.hasJoinedServer(em, serverId)
    }
  })
  refetchServerChannels(): boolean {
    return true
  }
}
