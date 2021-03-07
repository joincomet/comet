import { gql } from '@urql/core'

export default gql`
  mutation CreateCommentVote($commentId: ID!) {
    createCommentVote(commentId: $commentId)
  }
`
