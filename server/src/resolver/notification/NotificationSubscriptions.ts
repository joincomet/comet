import { Resolver, Subscription } from 'type-graphql'
import { SubscriptionTopic } from '@/types'

@Resolver()
export class NotificationSubscriptions {
  @Subscription(() => Boolean, {
    topics: SubscriptionTopic.RefetchNotifications,
    filter: ({ payload: userId, context: { user } }) => userId === user.id
  })
  refetchNotifications() {
    return true
  }
}
