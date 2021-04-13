import { gql } from '@urql/core'

export const COMMENT_DELETED = gql`
  subscription CommentDeleted {
    commentDeleted {
      commentId
      postId
    }
  }
`
