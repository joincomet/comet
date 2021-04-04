import { useCallback } from 'react'
import { useMutation } from 'urql'
import { PIN_POST, UNPIN_POST } from '@/graphql/mutations'

export const useTogglePostPin = post => {
  const [_pinRes, pin] = useMutation(PIN_POST)
  const [_unpinRes, unpin] = useMutation(UNPIN_POST)

  return useCallback(() => {
    const vars = { postId: post.id }
    if (post.isPinned) unpin(vars)
    else pin(vars)
  }, [post, pin, unpin])
}
