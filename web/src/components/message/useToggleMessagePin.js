import { useCallback } from 'react'
import { useMutation } from 'urql'
import { usePinMessageMutation, useUnpinMessageMutation } from '@/graphql/hooks'

export const useToggleMessagePin = message => {
  const [_pinRes, pin] = usePinMessageMutation()
  const [_unpinRes, unpin] = useUnpinMessageMutation()

  return useCallback(() => {
    const vars = { messageId: message.id }
    if (message.isPinned) unpin(vars)
    else pin(vars)
  }, [message, pin, unpin])
}
