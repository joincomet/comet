import { gql } from '@urql/core'

export default gql`
  mutation CreateChannel($name: String!, $serverId: ID!, $isPrivate: Boolean) {
    createChannel(name: $name, serverId: $serverId, isPrivate: $isPrivate) {
      id
    }
  }
`
