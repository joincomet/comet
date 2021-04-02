import { gql } from '@urql/core'

export const REFETCH_JOINED_SERVERS = gql`
  subscription RefetchJoinedServers {
    refetchJoinedServers
  }
`
