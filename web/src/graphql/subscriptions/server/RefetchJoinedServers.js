import { gql } from '@urql/core'
import { useSubscription } from 'urql'

export const REFETCH_JOINED_SERVERS = gql`
  subscription RefetchJoinedServers {
    refetchJoinedServers
  }
`

export const useRefetchJoinedServersSubscription = refetchJoinedServers =>
  useSubscription({ query: REFETCH_JOINED_SERVERS }, () =>
    refetchJoinedServers()
  )
