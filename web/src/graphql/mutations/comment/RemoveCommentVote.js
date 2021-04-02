import { gql } from '@urql/core'
import { COMMENT_FRAGMENT } from '@/graphql/fragments'

export const REMOVE_COMMENT_VOTE = gql`
  mutation RemoveCommentVote($commentId: ID!) {
    removeCommentVote(commentId: $commentId) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`
