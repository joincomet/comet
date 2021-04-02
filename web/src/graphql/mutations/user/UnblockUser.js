import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const UNBLOCK_USER = gql`
  mutation UnblockUser($userId: ID!) {
    unblockUser(userId: $userId)
  }
`

export const useUnblockUserMutation = () => useMutation(UNBLOCK_USER)
