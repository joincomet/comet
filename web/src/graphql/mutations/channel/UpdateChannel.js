import { gql } from '@urql/core'

export default gql`
  mutation UpdateChannel($channelId: ID!, $name: String, $description: String) {
    updateChannel(channelId: $channelId, name: $name, description: $description)
  }
`
