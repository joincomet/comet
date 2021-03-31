import { Virtuoso } from 'react-virtuoso'
import { useCallback, useRef } from 'react'
import { useNewMessageNotification } from '@/components/message/useNewMessageNotification'
import { usePrependedMessagesCount } from '@/components/message/usePrependedMessagesCount'
import { useShouldForceScrollToBottom } from '@/components/message/useShouldForceScrollToBottom'
import Message from '@/components/message/Message'
import { useMessages } from '@/components/message/useMessages'
import SendMessageBar from '@/components/message/SendMessageBar'
import MessagesHeader from '@/components/message/MessagesHeader'

const PREPEND_OFFSET = 10 ** 7

export default function Messages({ channel, user, group }) {
  const [messages, fetching, fetchMore] = useMessages({ channel, user, group })
  const virtuoso = useRef(null)

  const {
    atBottom,
    newMessagesNotification,
    setNewMessagesNotification
  } = useNewMessageNotification(messages)

  const numItemsPrepended = usePrependedMessagesCount(messages)

  const shouldForceScrollToBottom = useShouldForceScrollToBottom(messages)

  const messageRenderer = useCallback(
    (messageList, virtuosoIndex) => {
      const streamMessageIndex =
        virtuosoIndex + numItemsPrepended - PREPEND_OFFSET

      const message = messageList[streamMessageIndex]
      const prevMessage =
        streamMessageIndex > 0 ? messageList[streamMessageIndex - 1] : null

      if (!message) return <div style={{ height: '1px' }} /> // returning null or zero height breaks the virtuoso

      return (
        <Message
          message={message}
          showUser={
            streamMessageIndex === 0 ||
            (prevMessage && prevMessage.author.id !== message.author.id)
          }
        />
      )
    },
    [numItemsPrepended]
  )

  return (
    <>
      <div className="relative flex-1 overflow-x-hidden overflow-y-auto dark:bg-gray-750 w-full h-full">
        <Virtuoso
          className="scrollbar"
          alignToBottom
          atBottomStateChange={isAtBottom => {
            atBottom.current = isAtBottom
            if (isAtBottom && newMessagesNotification) {
              setNewMessagesNotification(false)
            }
          }}
          firstItemIndex={PREPEND_OFFSET - numItemsPrepended}
          followOutput={isAtBottom => {
            if (shouldForceScrollToBottom()) {
              return isAtBottom ? 'smooth' : 'auto'
            }
            // a message from another user has been received - don't scroll to bottom unless already there
            return isAtBottom ? 'smooth' : false
          }}
          initialTopMostItemIndex={
            messages && messages.length > 0 ? messages.length - 1 : 0
          }
          itemContent={i => messageRenderer(messages, i)}
          overscan={0}
          ref={virtuoso}
          startReached={() => {
            if (!fetching) fetchMore()
          }}
          style={{ overflowX: 'hidden' }}
          totalCount={messages?.length || 0}
        />
      </div>
      <SendMessageBar channel={channel} user={user} group={group} />
    </>
  )
}
