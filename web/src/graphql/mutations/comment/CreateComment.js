import { gql } from '@urql/core'
import { COMMENT_FRAGMENT } from '@/graphql/fragments'

export default gql`
  mutation CreateComment($text: String!, $postId: ID!, $parentCommentId: ID) {
    createComment(
      text: $text
      postId: $postId
      parentCommentId: $parentCommentId
    ) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`
