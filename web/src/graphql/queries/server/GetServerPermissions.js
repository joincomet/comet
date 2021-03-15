import { gql } from '@urql/core'

export default gql`
  query GetServerPermissions($serverId: ID!) {
    getServerPermissions(serverId: $serverId)
  }
`
