import { useCallback } from 'react'
import { usePinMessageMutation, useUnpinMessageMutation } from '@/graphql/hooks'

export const useToggleMessagePin = message => {
  const [pin] = usePinMessageMutation()
  const [unpin] = useUnpinMessageMutation()

  return useCallback(() => {
    const variables = { messageId: message.id }
    if (message.isPinned) unpin({ variables })
    else pin({ variables })
  }, [message, pin, unpin])
}
