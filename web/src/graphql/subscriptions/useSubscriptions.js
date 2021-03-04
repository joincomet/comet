import { useSubscription } from 'urql'
import { MESSAGE_CREATED, MESSAGE_UPDATED } from '@/graphql/subscriptions'

export default function useSubscriptions() {
  useSubscription({ query: MESSAGE_CREATED })
  useSubscription({ query: MESSAGE_UPDATED })
}
