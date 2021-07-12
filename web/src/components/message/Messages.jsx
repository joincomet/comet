import { useCallback, useRef, useState, useEffect } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useNewMessageNotification } from '@/components/message/useNewMessageNotification'
import { usePrependedMessagesCount } from '@/components/message/usePrependedMessagesCount'
import Message from '@/components/message/Message'
import { useMessages } from '@/components/message/useMessages'
import MessageInput from '@/components/message/input/MessageInput'
import { useShouldForceScrollToBottom } from '@/components/message/useShouldForceScrollToBottom'
import {
  useReadChannelMutation,
  useReadDmMutation,
  useReadGroupMutation
} from '@/graphql/hooks'
import {useCurrentUser} from "@/hooks/graphql/useCurrentUser";

const PREPEND_OFFSET = 10 ** 7

export default function Messages({ channel, server, user, group, users }) {
  const virtuoso = useRef(null)

  const [messages, fetching, fetchMore, hasMore] = useMessages({
    channelId: channel?.id,
    userId: user?.id,
    group: group?.id
  })

  const [length, setLength] = useState(messages?.length || 0)
  useEffect(() => {
    setLength(messages?.length || 0)
    virtuoso?.current?.scrollToIndex(length + PREPEND_OFFSET)
  }, [channel, user, group, virtuoso])

  const { atBottom, newMessagesNotification, setNewMessagesNotification } =
    useNewMessageNotification(messages)

  const numItemsPrepended = usePrependedMessagesCount(messages)
  const shouldForceScrollToBottom = useShouldForceScrollToBottom(messages)

  const messageRenderer = useCallback(
    (messageList, virtuosoIndex) => {
      const messageIndex = virtuosoIndex + numItemsPrepended - PREPEND_OFFSET

      const message = messageList[messageIndex]
      const prevMessage =
        messageIndex > 0 ? messageList[messageIndex - 1] : null

      if (!message) return <div style={{ height: '1px' }} /> // returning null or zero height breaks the virtuoso

      return (
        <Message
          server={server}
          channel={channel}
          group={group}
          user={user}
          message={message}
          index={messageIndex}
          prevMessage={prevMessage}
        />
      )
    },
    [numItemsPrepended, server, channel, group, user]
  )

  const [readChannel] = useReadChannelMutation()
  const [readGroup] = useReadGroupMutation()
  const [readDm] = useReadDmMutation()
  const [currentUser] = useCurrentUser()

  useEffect(() => {
    if (!currentUser) return
    if (!messages?.length) return
    if (channel)
      readChannel({
        variables: { input: { channelId: channel.id } },
        optimisticResponse: {
          readChannel: {
            ...channel,
            isUnread: false
          }
        }
      })
    else if (group)
      readGroup({
        variables: { input: { groupId: group.id } },
        optimisticResponse: {
          readGroup: {
            ...group,
            unreadCount: 0
          }
        }
      })
    else if (user)
      readDm({
        variables: { input: { userId: user.id } },
        optimisticResponse: {
          readDm: {
            ...user,
            unreadCount: 0
          }
        }
      })
  }, [channel?.id, group?.id, user?.id, currentUser?.id, messages?.length])

  return (
    <div className="flex flex-col h-full">
      {!!messages && (
        <Virtuoso
          className="scrollbar-custom dark:bg-gray-750 bg-white"
          alignToBottom
          atBottomStateChange={isAtBottom => {
            atBottom.current = isAtBottom
            if (isAtBottom && newMessagesNotification) {
              setNewMessagesNotification(false)
            }
          }}
          components={{
            Footer: () => <div className="h-5.5" />
          }}
          firstItemIndex={PREPEND_OFFSET - numItemsPrepended}
          followOutput={isAtBottom => {
            if (shouldForceScrollToBottom()) {
              return 'auto'
            }
            // a message from another user has been received - don't scroll to bottom unless already there
            return isAtBottom ? 'auto' : false
          }}
          initialTopMostItemIndex={
            messages.length > 0 ? messages.length - 1 : 0
          }
          itemContent={i => messageRenderer(messages, i)}
          overscan={0}
          ref={virtuoso}
          startReached={() => {
            if (!fetching && hasMore) fetchMore()
          }}
          style={{ overflowX: 'hidden' }}
          totalCount={messages.length || 0}
        />
      )}
      {!!users && (!!channel || !!user || !!group) && (
        <MessageInput
          server={server}
          channel={channel}
          user={user}
          group={group}
          users={users}
        />
      )}
    </div>
  )
}
