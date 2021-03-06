import { gql } from '@urql/core'

export default gql`
  mutation RemoveComment($commentId: ID!, $reason: String) {
    removeComment(commentId: $commentId, reason: $reason)
  }
`
