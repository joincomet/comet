import { gql } from '@urql/core'

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($userId: ID!) {
    removeFriend(userId: $userId)
  }
`
