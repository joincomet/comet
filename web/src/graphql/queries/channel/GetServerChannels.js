import { gql } from '@urql/core'

export const GET_SERVER_CHANNELS = gql`
  query GetServerChannels($serverId: ID!) {
    getServerChannels(serverId: $serverId) {
      id
      name
      description
    }
  }
`
