import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($messageId: ID!) {
    deleteMessage(messageId: $messageId)
  }
`

export const useDeleteMessageMutation = () => useMutation(DELETE_MESSAGE)
