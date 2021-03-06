import { gql } from '@urql/core'

export default gql`
  mutation RemoveMessage($messageId: ID!, $reason: String) {
    removeMessage(messageId: $messageId, reason: $reason)
  }
`
