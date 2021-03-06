import { gql } from '@urql/core'

export default gql`
  mutation CreateChannel($name: String!, $serverId: ID!, $modOnly: Boolean) {
    createChannel(name: $name, serverId: $serverId, modOnly: $modOnly) {
      id
    }
  }
`
