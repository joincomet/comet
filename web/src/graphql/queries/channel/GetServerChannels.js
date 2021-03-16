import { gql } from '@urql/core'

export default gql`
  query GetServerChannels($serverId: ID!) {
    getServerChannels(serverId: $serverId) {
      id
      name
      description
    }
  }
`
