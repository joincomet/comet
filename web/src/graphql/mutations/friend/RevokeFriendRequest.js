import { gql } from '@urql/core'

export const REVOKE_FRIEND_REQUEST = gql`
  mutation RevokeFriendRequest($userId: ID!) {
    revokeFriendRequest(userId: $userId)
  }
`
