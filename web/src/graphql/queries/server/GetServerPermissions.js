import { gql } from '@urql/core'

export const GET_SERVER_PERMISSIONS = gql`
  query GetServerPermissions($serverId: ID!) {
    getServerPermissions(serverId: $serverId)
  }
`
