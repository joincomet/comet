import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const REMOVE_FRIEND = gql`
  mutation RemoveFriend($userId: ID!) {
    removeFriend(userId: $userId)
  }
`

export const useRemoveFriendMutation = () => useMutation(REMOVE_FRIEND)
