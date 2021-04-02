import { gql } from '@urql/core'

export const JOIN_SERVER = gql`
  mutation JoinServer($serverId: ID!) {
    joinServer(serverId: $serverId)
  }
`
