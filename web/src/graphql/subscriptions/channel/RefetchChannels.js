import { gql } from '@urql/core'

export const REFETCH_SERVER_CHANNELS = gql`
  subscription RefetchServerChannels {
    refetchServerChannels
  }
`
