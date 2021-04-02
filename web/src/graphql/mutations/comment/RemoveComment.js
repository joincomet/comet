import { gql } from '@urql/core'

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($commentId: ID!, $reason: String) {
    removeComment(commentId: $commentId, reason: $reason)
  }
`
