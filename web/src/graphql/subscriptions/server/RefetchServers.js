import { gql } from '@urql/core'

export const REFETCH_SERVERS = gql`
  subscription RefetchServers {
    refetchServers
  }
`
