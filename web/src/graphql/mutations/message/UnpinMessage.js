import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const UNPIN_MESSAGE = gql`
  mutation UnpinMessage($messageId: ID!) {
    unpinMessage(messageId: $messageId)
  }
`

export const useUnpinMessageMutation = () => useMutation(UNPIN_MESSAGE)
