import { SubscriptionFilter } from '@/types'
import { SubscriberPayload } from '@/types/subscriptions/SubscriberPayload'

type funcType<TPayload = any> = (
  filter: SubscriptionFilter<TPayload>
) => Promise<boolean> | boolean

export function createFilter<TPayload = any>(
  func: funcType<TPayload>
): funcType<TPayload> {
  return func
}

export const subscriberFilter = createFilter<SubscriberPayload>(
  ({ payload: { subscriberId }, context: { user } }) => user.id === subscriberId
)
