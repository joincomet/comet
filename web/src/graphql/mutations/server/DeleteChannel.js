import { gql } from '@urql/core'

export default gql`
  mutation DeleteChannel($channelId: ID!) {
    deleteChannel(channelId: $channelId)
  }
`
