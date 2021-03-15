import { gql } from '@urql/core'

export default gql`
  mutation BanUserGlobal($userId: ID!, $reason: String, $purge: Boolean) {
    banUserGlobal(userId: $userId, reason: $reason, purge: $purge)
  }
`
