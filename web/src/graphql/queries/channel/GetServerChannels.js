import { gql } from '@urql/core'
import { CHANNEL_FRAGMENT } from '@/graphql/fragments'

export const GET_SERVER_CHANNELS = gql`
  query GetServerChannels($serverId: ID!) {
    getServerChannels(serverId: $serverId) {
      ...CHANNEL_FRAGMENT
    }
  }
  ${CHANNEL_FRAGMENT}
`
