import { useCallback } from 'react'
import { useMutation } from 'urql'
import { PIN_MESSAGE, UNPIN_MESSAGE } from '@/graphql/mutations'

export const useToggleMessagePin = message => {
  const [_pinRes, pin] = useMutation(PIN_MESSAGE)
  const [_unpinRes, unpin] = useMutation(UNPIN_MESSAGE)

  return useCallback(() => {
    const vars = { messageId: message.id }
    if (message.isPinned) unpin(vars)
    else pin(vars)
  }, [message, pin, unpin])
}
