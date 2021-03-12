import { ID, Resolver, Root, Subscription } from 'type-graphql'
import { subscriberFilter as filter } from '@/util'
import { SubscriptionTopic, SubscriberPayload } from '@/types'
import { Notification } from '@/entity'

@Resolver()
export class NotificationSubscriptions {
  @Subscription(() => Notification, {
    topics: SubscriptionTopic.NotificationReceived,
    filter,
    description: 'Published when a notification is received by current user'
  })
  notificationReceived(
    @Root() { payload: notif }: SubscriberPayload<Notification>
  ) {
    return notif
  }

  @Subscription(() => ID, {
    topics: SubscriptionTopic.NotificationRemoved,
    filter,
    description:
      'Published when a notification should be removed (i.e. comment is deleted)'
  })
  notificationRemoved(@Root() { payload: notifId }: SubscriberPayload<string>) {
    return notifId
  }

  @Subscription(() => ID, {
    topics: SubscriptionTopic.NotificationRead,
    filter,
    description: 'Published when a notification is marked as read'
  })
  notificationRead(@Root() { payload: notifId }: SubscriberPayload<string>) {
    return notifId
  }

  @Subscription(() => ID, {
    topics: SubscriptionTopic.NotificationReadAll,
    filter,
    description: 'Published when all notifications are marked as read'
  })
  notificationReadAll(@Root() {}: SubscriberPayload<boolean>) {
    return true
  }
}
