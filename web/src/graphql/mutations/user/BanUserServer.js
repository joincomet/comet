import { gql } from '@urql/core'

export default gql`
  mutation BanUserServer($serverId: ID!, $userId: ID!, reason: String, purge: Boolean) {
    banUserServer(serverId: $serverId, userId: $userId, reason: $reason, purge: $purge)
  }
`
