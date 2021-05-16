import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useEffect, useRef } from 'react'

export function useShouldForceScrollToBottom(messages) {
  const [currentUser] = useCurrentUser()
  const lastFocusedOwnMessage = useRef('')
  const initialFocusRegistered = useRef(false)

  function recheckForNewOwnMessage() {
    if (messages && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]

      if (
        lastMessage.author?.id === currentUser?.id &&
        lastFocusedOwnMessage.current !== lastMessage.id
      ) {
        lastFocusedOwnMessage.current = lastMessage.id
        return true
      }
    }
    return false
  }

  useEffect(() => {
    if (messages && messages.length && !initialFocusRegistered.current) {
      initialFocusRegistered.current = true
      recheckForNewOwnMessage()
    }
  }, [messages, messages?.length])

  return recheckForNewOwnMessage
}
