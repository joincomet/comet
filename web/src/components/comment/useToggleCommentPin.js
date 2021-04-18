import { useCallback } from 'react'
import { useMutation } from 'urql'
import { usePinCommentMutation, useUnpinCommentMutation } from '@/graphql/hooks'

export const useToggleCommentPin = comment => {
  const [_pinRes, pin] = usePinCommentMutation()
  const [_unpinRes, unpin] = useUnpinCommentMutation()

  return useCallback(() => {
    const vars = { commentId: comment.id }
    if (comment.isPinned) unpin(vars)
    else pin(vars)
  }, [comment, pin, unpin])
}
