import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT } from '@/graphql/fragments'

export const EDIT_MESSAGE = gql`
  mutation EditMessage($text: String!, $messageId: ID!) {
    editMessage(text: $text, messageId: $messageId) {
      ...MESSAGE_FRAGMENT
    }
  }
  ${MESSAGE_FRAGMENT}
`
