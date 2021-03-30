import { gql } from '@urql/core'
import { COMMENT_FRAGMENT } from '@/graphql/fragments'

export const CREATE_COMMENT_VOTE = gql`
  mutation CreateCommentVote($commentId: ID!) {
    createCommentVote(commentId: $commentId) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`
