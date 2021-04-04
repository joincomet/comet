import { gql } from '@urql/core'
import { COMMENT_FRAGMENT } from '@/graphql/fragments'

export const UNVOTE_COMMENT = gql`
  mutation UnvoteComment($commentId: ID!) {
    unvoteComment(commentId: $commentId) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`
