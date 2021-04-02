import { gql } from '@urql/core'

export const REMOVE_MESSAGE = gql`
  mutation RemoveMessage($messageId: ID!) {
    removeMessage(messageId: $messageId)
  }
`
