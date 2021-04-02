import { gql } from '@urql/core'
import { COMMENT_FRAGMENT } from '@/graphql/fragments'

export const EDIT_COMMENT = gql`
  mutation EditComment($text: String!, $commentId: ID!) {
    editComment(text: $text, commentId: $commentId) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`
