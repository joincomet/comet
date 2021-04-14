import { gql } from '@urql/core'
import { MESSAGE_FRAGMENT } from '@/graphql/fragments'

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($text: String!, $messageId: ID!) {
    updateMessage(text: $text, messageId: $messageId) {
      ...MESSAGE_FRAGMENT
    }
  }
  ${MESSAGE_FRAGMENT}
`
