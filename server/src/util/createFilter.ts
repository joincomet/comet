import { SubscriptionFilter } from '@/types'
import { SubscriberPayload } from '@/types/subscriptions/SubscriberPayload'

export function createFilter<TPayload = any>(
  func: (filter: SubscriptionFilter<TPayload>) => Promise<boolean> | boolean
): (filter: SubscriptionFilter<TPayload>) => Promise<boolean> | boolean {
  return func
}

export const subscriberFilter = createFilter<SubscriberPayload>(
  ({ payload: { subscriberId }, context: { user } }) => user.id === subscriberId
)
