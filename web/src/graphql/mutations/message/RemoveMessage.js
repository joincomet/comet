import { gql } from '@urql/core'

export default gql`
  mutation RemoveMessage($messageId: ID!) {
    removeMessage(messageId: $messageId)
  }
`
