import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const EDIT_MESSAGE = gql`
  mutation EditMessage($text: String!, $messageId: ID!) {
    editMessage(text: $text, messageId: $messageId) {
      ...MESSAGE_FRAGMENT
    }
  }
  ${MESSAGE_FRAGMENT}
`

export const useEditMessageMutation = () => useMutation(EDIT_MESSAGE)
