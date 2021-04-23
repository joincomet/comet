import { useCallback } from 'react'
import { usePinMessageMutation, useUnpinMessageMutation } from '@/graphql/hooks'

export const useToggleMessagePin = message => {
  const [pin] = usePinMessageMutation()
  const [unpin] = useUnpinMessageMutation()

  return useCallback(() => {
    const input = { messageId: message.id }
    if (message.isPinned) unpin({ variables: { input } })
    else pin({ variables: { input } })
  }, [message, pin, unpin])
}
