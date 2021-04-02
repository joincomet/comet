import { gql } from '@urql/core'

export const USER_STARTED_TYPING = gql`
  subscription UserStartedTyping {
    userStartedTyping
  }
`
