import { gql } from '@urql/core'

export default gql`
  mutation UpdateMessage($text: String!, $messageId: ID!) {
    updateMessage(text: $text, messageId: $messageId)
  }
`
