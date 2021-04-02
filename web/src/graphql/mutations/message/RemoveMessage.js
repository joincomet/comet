import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const REMOVE_MESSAGE = gql`
  mutation RemoveMessage($messageId: ID!) {
    removeMessage(messageId: $messageId)
  }
`

export const useRemoveMessageMutation = () => useMutation(REMOVE_MESSAGE)
