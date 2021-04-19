import { useCallback } from 'react'
import { usePinCommentMutation, useUnpinCommentMutation } from '@/graphql/hooks'

export const useToggleCommentPin = comment => {
  const [pin] = usePinCommentMutation()
  const [unpin] = useUnpinCommentMutation()

  return useCallback(() => {
    const variables = { commentId: comment.id }
    if (comment.isPinned) unpin({ variables })
    else pin({ variables })
  }, [comment, pin, unpin])
}
