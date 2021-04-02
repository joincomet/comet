import { gql } from '@urql/core'
import { CHANNEL_FRAGMENT } from '@/graphql/fragments'
import { useQuery } from 'urql'

export const GET_SERVER_CHANNELS = gql`
  query GetServerChannels($serverId: ID!) {
    getServerChannels(serverId: $serverId) {
      ...CHANNEL_FRAGMENT
    }
  }
  ${CHANNEL_FRAGMENT}
`

export const useServerChannelsQuery = ({ serverId }) =>
  useQuery({ query: GET_SERVER_CHANNELS })
