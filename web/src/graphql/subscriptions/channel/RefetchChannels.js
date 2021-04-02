import { gql } from '@urql/core'
import { useSubscription } from 'urql'

export const REFETCH_SERVER_CHANNELS = gql`
  subscription RefetchServerChannels {
    refetchServerChannels
  }
`

export const useRefetchServerChannelsSubscription = refetchServerChannels =>
  useSubscription({ query: REFETCH_SERVER_CHANNELS }, () =>
    refetchServerChannels()
  )
