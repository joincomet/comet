import { gql } from '@urql/core'

export const KICK_USER_FROM_SERVER = gql`
  mutation KickUserFromServer($serverId: ID!, $userId: ID!) {
    kickUserFromServer(serverId: $serverId, userId: $userId)
  }
`
