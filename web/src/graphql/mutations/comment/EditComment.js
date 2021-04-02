import { gql } from '@urql/core'
import { COMMENT_FRAGMENT } from '@/graphql/fragments'
import { useMutation } from 'urql'

export const EDIT_COMMENT = gql`
  mutation EditComment($text: String!, $commentId: ID!) {
    editComment(text: $text, commentId: $commentId) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`

export const useEditCommentMutation = () => useMutation(EDIT_COMMENT)
