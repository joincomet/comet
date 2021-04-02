import { gql } from '@urql/core'
import { useQuery } from 'urql'

export const GET_SERVER_PERMISSIONS = gql`
  query GetServerPermissions($serverId: ID!) {
    getServerPermissions(serverId: $serverId)
  }
`

export const useServerPermissionsQuery = ({ serverId }) =>
  useQuery({ query: GET_SERVER_PERMISSIONS, variables: { serverId } })
