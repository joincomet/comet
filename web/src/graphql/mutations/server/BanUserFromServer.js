import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const BAN_USER_FROM_SERVER = gql`
  mutation BanUserFromServer(
    $serverId: ID!
    $userId: ID!
    $reason: String
    $purge: Boolean
  ) {
    banUserFromServer(
      serverId: $serverId
      userId: $userId
      reason: $reason
      purge: $purge
    )
  }
`

export const useBanUserFromServerMutation = () =>
  useMutation(BAN_USER_FROM_SERVER)
