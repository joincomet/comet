import { gql } from '@urql/core'

export default gql`
  mutation CreateMessage($text: String!, $channelId: ID!) {
    createMessage(text: $text, channelId: $channelId)
  }
`
