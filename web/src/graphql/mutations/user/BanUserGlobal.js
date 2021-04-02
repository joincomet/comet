import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const BAN_USER_GLOBAL = gql`
  mutation BanUserGlobal($userId: ID!, $reason: String, $purge: Boolean) {
    banUserGlobal(userId: $userId, reason: $reason, purge: $purge)
  }
`

export const useBanUserGlobalMutation = () => useMutation(BAN_USER_GLOBAL)
