import { gql } from '@urql/core'
import { COMMENT_FRAGMENT } from '@/graphql/fragments'

export const UNPIN_COMMENT = gql`
  mutation UnpinComment($commentId: ID!) {
    unpinComment(commentId: $commentId) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`
