import { gql } from '@urql/core'

export const CREATE_FRIEND_REQUEST = gql`
  mutation CreateFriendRequest($userId: ID!) {
    createFriendRequest(userId: $userId)
  }
`
