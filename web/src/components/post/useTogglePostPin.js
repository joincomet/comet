import { useCallback } from 'react'
import { usePinPostMutation, useUnpinPostMutation } from '@/graphql/hooks'

export const useTogglePostPin = post => {
  const [pin] = usePinPostMutation()
  const [unpin] = useUnpinPostMutation()

  return useCallback(() => {
    const input = { postId: post.id }
    if (post.isPinned) unpin({ variables: { input } })
    else pin({ variables: { input } })
  }, [post, pin, unpin])
}
