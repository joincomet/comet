import { gql } from '@urql/core'

export const PIN_MESSAGE = gql`
  mutation PinMessage($messageId: ID!) {
    pinMessage(messageId: $messageId)
  }
`
