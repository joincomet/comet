import { gql } from '@urql/core'
import { COMMENT_FRAGMENT } from '@/graphql/fragments'

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($text: String!, $commentId: ID!) {
    updateComment(text: $text, commentId: $commentId) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`
