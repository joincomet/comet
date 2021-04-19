import { useCallback } from 'react'
import { usePinPostMutation, useUnpinPostMutation } from '@/graphql/hooks'

export const useTogglePostPin = post => {
  const [pin] = usePinPostMutation()
  const [unpin] = useUnpinPostMutation()

  return useCallback(() => {
    const variables = { postId: post.id }
    if (post.isPinned) unpin({ variables })
    else pin({ variables })
  }, [post, pin, unpin])
}
