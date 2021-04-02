import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId)
  }
`

export const useDeleteCommentMutation = () => useMutation(DELETE_COMMENT)
