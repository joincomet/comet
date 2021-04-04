import { gql } from '@urql/core'
import { COMMENT_FRAGMENT } from '@/graphql/fragments'

export const PIN_COMMENT = gql`
  mutation PinComment($commentId: ID!) {
    pinComment(commentId: $commentId) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`
