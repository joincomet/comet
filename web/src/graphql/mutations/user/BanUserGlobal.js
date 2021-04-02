import { gql } from '@urql/core'

export const BAN_USER_GLOBAL = gql`
  mutation BanUserGlobal($userId: ID!, $reason: String, $purge: Boolean) {
    banUserGlobal(userId: $userId, reason: $reason, purge: $purge)
  }
`
