import { gql } from '@urql/core'

export default gql`
  mutation VoteComment($commentId: ID!) {
    voteComment(commentId: $commentId)
  }
`
