import { gql } from '@urql/core'

export default gql`
  mutation RemoveCommentVote($commentId: ID!) {
    removeCommentVote(commentId: $commentId)
  }
`
