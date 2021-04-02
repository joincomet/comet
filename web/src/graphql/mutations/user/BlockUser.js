import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const BLOCK_USER = gql`
  mutation BlockUser($userId: ID!) {
    blockUser(userId: $userId)
  }
`

export const useBlockUserMutation = () => useMutation(BLOCK_USER)
