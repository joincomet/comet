import { gql } from '@urql/core'
import { useSubscription } from 'urql'

export const USER_STARTED_TYPING = gql`
  subscription UserStartedTyping {
    userStartedTyping
  }
`

export const useUserStartedTypingSubscription = handler =>
  useSubscription({ query: USER_STARTED_TYPING }, handler)
