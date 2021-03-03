import { useSubscription } from 'urql'
import { NEW_MESSAGE, UPDATE_MESSAGE } from '@/graphql/subscriptions/message'

export default function useSubscriptions() {
  useSubscription({ query: NEW_MESSAGE })
  useSubscription({ query: UPDATE_MESSAGE })
}
