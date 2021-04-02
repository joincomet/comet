import { gql } from '@urql/core'

export const DELETE_SERVER = gql`
  mutation DeleteServer($serverId: ID!) {
    deleteServer(serverId: $serverId)
  }
`
