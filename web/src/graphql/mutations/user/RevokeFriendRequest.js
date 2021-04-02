import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const REVOKE_FRIEND_REQUEST = gql`
  mutation RevokeFriendRequest($userId: ID!) {
    revokeFriendRequest(userId: $userId)
  }
`

export const useRevokeFriendRequestMutation = () =>
  useMutation(REVOKE_FRIEND_REQUEST)
