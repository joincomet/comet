import { gql } from '@urql/core'

export default gql`
  mutation SendMessage($text: String!, $channelId: ID!) {
    sendMessage(text: $text, channelId: $channelId)
  }
`
