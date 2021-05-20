import { useEffect, useRef, useState } from 'react'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export function useNewMessageNotification(messages) {
  const [currentUser] = useCurrentUser()
  const [newMessagesNotification, setNewMessagesNotification] = useState(false)

  const lastMessageId = useRef('')
  const atBottom = useRef(false)

  useEffect(() => {
    /* handle scrolling behavior for new messages */
    if (!messages?.length) return

    const lastMessage = messages[messages.length - 1]
    const prevMessageId = lastMessageId.current
    lastMessageId.current = lastMessage.id || '' // update last message id

    /* do nothing if new messages are loaded from top(loadMore)  */
    if (lastMessage.id === prevMessageId) return

    /* if list is already at the bottom return, followOutput will do the job */
    if (atBottom.current) return

    /* if the new message belongs to current user scroll to bottom */
    if (currentUser && lastMessage.author?.id !== currentUser.id) {
      /* otherwise just show newMessage notification  */
      setNewMessagesNotification(true)
    }
  }, [currentUser, messages])

  return { atBottom, newMessagesNotification, setNewMessagesNotification }
}
