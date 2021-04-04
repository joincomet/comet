import { gql } from '@urql/core'
import { COMMENT_FRAGMENT } from '@/graphql/fragments'

export const VOTE_COMMENT = gql`
  mutation VoteComment($commentId: ID!) {
    voteComment(commentId: $commentId) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`
