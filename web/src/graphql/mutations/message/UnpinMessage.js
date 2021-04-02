import { gql } from '@urql/core'

export const UNPIN_MESSAGE = gql`
  mutation UnpinMessage($messageId: ID!) {
    unpinMessage(messageId: $messageId)
  }
`
