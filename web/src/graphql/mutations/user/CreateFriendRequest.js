import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const CREATE_FRIEND_REQUEST = gql`
  mutation CreateFriendRequest($userId: ID!) {
    createFriendRequest(userId: $userId)
  }
`

export const useCreateFriendRequestMutation = () =>
  useMutation(CREATE_FRIEND_REQUEST)
