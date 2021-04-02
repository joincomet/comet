import {
  useMessageRemovedSubscription,
  useMessageSentSubscription,
  useMessageUpdatedSubscription
} from '@/graphql/subscriptions'

export const useMessageSubscriptions = () => {
  useMessageSentSubscription()
  useMessageRemovedSubscription()
  useMessageUpdatedSubscription()
}
