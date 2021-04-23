import { useCallback } from 'react'
import { usePinCommentMutation, useUnpinCommentMutation } from '@/graphql/hooks'

export const useToggleCommentPin = comment => {
  const [pin] = usePinCommentMutation()
  const [unpin] = useUnpinCommentMutation()

  return useCallback(() => {
    const input = { commentId: comment.id }
    if (comment.isPinned) unpin({ variables: { input } })
    else pin({ variables: { input } })
  }, [comment, pin, unpin])
}
