import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const PIN_MESSAGE = gql`
  mutation PinMessage($messageId: ID!) {
    pinMessage(messageId: $messageId)
  }
`

export const usePinMessageMutation = () => useMutation(PIN_MESSAGE)
