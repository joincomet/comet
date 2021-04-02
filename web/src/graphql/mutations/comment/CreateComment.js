import { gql } from '@urql/core'
import { COMMENT_FRAGMENT, USER_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const CREATE_COMMENT = gql`
  mutation CreateComment($text: String!, $postId: ID!, $parentCommentId: ID) {
    createComment(
      text: $text
      postId: $postId
      parentCommentId: $parentCommentId
    ) {
      ...COMMENT_FRAGMENT
      author {
        ...USER_FRAGMENT
      }
    }
  }
  ${COMMENT_FRAGMENT}
  ${USER_FRAGMENT}
`

export const useCreateCommentMutation = () => useMutation(CREATE_COMMENT)
