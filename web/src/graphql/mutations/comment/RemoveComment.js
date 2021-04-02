import { gql } from '@urql/core'
import { useMutation } from 'urql'

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($commentId: ID!, $reason: String) {
    removeComment(commentId: $commentId, reason: $reason)
  }
`

export const useRemoveCommentMutation = () => useMutation(REMOVE_COMMENT)
