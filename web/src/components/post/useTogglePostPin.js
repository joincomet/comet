import { useCallback } from 'react'
import { useMutation } from 'urql'
import { usePinPostMutation, useUnpinPostMutation } from '@/graphql/hooks'

export const useTogglePostPin = post => {
  const [_pinRes, pin] = usePinPostMutation()
  const [_unpinRes, unpin] = useUnpinPostMutation()

  return useCallback(() => {
    const vars = { postId: post.id }
    if (post.isPinned) unpin(vars)
    else pin(vars)
  }, [post, pin, unpin])
}
