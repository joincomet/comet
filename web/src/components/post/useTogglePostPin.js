import { useCallback } from 'react'
import { useMutation } from 'urql'

export const useTogglePostPin = post => {
  const [_pinRes, pin] = useMutation(PIN_POST)
  const [_unpinRes, unpin] = useMutation(UNPIN_POST)

  return useCallback(() => {
    const vars = { postId: post.id }
    if (post.isPinned) unpin(vars)
    else pin(vars)
  }, [post, pin, unpin])
}
