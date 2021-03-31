import { Authorized, Resolver, Subscription } from 'type-graphql'
import { SubscriptionTopic } from '@/types'

@Resolver()
export class NotificationSubscriptions {
  @Authorized()
  @Subscription(() => Boolean, {
    topics: SubscriptionTopic.RefetchNotifications,
    filter: ({ payload: userId, context: { user } }) => userId === user.id
  })
  refetchNotifications(): boolean {
    return true
  }
}
