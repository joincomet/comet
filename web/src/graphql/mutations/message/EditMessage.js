import { gql } from '@urql/core'

export default gql`
  mutation EditMessage($text: String!, $messageId: ID!) {
    editMessage(text: $text, messageId: $messageId)
  }
`
