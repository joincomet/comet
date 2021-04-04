import { useCallback } from 'react'
import { useMutation } from 'urql'
import { PIN_COMMENT, UNPIN_COMMENT } from '@/graphql/mutations'

export const useToggleCommentPin = comment => {
  const [_pinRes, pin] = useMutation(PIN_COMMENT)
  const [_unpinRes, unpin] = useMutation(UNPIN_COMMENT)

  return useCallback(() => {
    const vars = { commentId: comment.id }
    if (comment.isPinned) unpin(vars)
    else pin(vars)
  }, [comment, pin, unpin])
}
