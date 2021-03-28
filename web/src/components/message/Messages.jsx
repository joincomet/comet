import React, { useCallback, useEffect, useRef, useState } from 'react'
import Message from '@/components/message/Message'
import { useQuery } from 'urql'
import { GET_MESSAGES } from '@/graphql/queries'
import SendMessageBar from '@/components/message/SendMessageBar'
import { useVirtual } from 'react-virtual'
import { IconSpinner } from '@/lib/Icons'
import { useInView } from 'react-intersection-observer'

export default function Messages({ channel, group, user }) {
  const [page, setPage] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [initialTime, setInitialTime] = useState(new Date().toString())

  const canFetchMore = true
  const pageSize = 50

  const [{ data, fetching }] = useQuery({
    query: GET_MESSAGES,
    variables: {
      channelId: channel?.id,
      groupId: group?.id,
      userId: user?.id,
      initialTime,
      pageSize,
      page
    }
  })

  const messages = data?.getMessages ?? []

  const parentRef = useRef()

  const rowVirtualizer = useVirtual({
    size: canFetchMore ? messages.length + 1 : messages.length,
    parentRef,
    estimateSize: useCallback(() => 100, []),
    keyExtractor: useCallback(
      index => (index !== 0 ? messages[index - 1].id : 'loader'),
      [messages]
    ),
    overscan: pageSize + 1
  })

  // Scroll to bottom on first load, and when current user sends a message
  useEffect(() => {
    if (messages.length === 0) return
    if (!hasScrolled || messages[messages.length - 1].author.isCurrentUser) {
      rowVirtualizer.scrollToIndex(messages.length)
      setHasScrolled(true)
    }
  }, [messages.length])

  // Maintain position after loading another batch of messages
  useEffect(() => {
    if (fetching || messages.length < pageSize * 2) return
    rowVirtualizer.scrollToIndex(pageSize + 1)
  }, [fetching])

  const [viewRef, inView, entry] = useInView()

  useEffect(() => {
    if (inView && messages.length > 0 && !fetching) {
      setPage(page + 1)
    }
  }, [inView])

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: `100%`,
          width: `100%`,
          overflow: 'auto'
        }}
        className="scrollbar dark:bg-gray-750"
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`
          }}
          className="relative w-full"
        >
          {rowVirtualizer.virtualItems.map(virtualRow => {
            const isLoaderRow = virtualRow.index === 0
            const message = messages[virtualRow.index - 1]

            return (
              <div
                key={virtualRow.index}
                ref={el => virtualRow.measureRef(el)}
                className="absolute top-0 left-0 w-full h-auto"
                style={{
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                {isLoaderRow ? (
                  <div
                    className="flex items-center justify-center h-20"
                    ref={viewRef}
                  >
                    <IconSpinner />
                  </div>
                ) : (
                  <Message
                    message={message}
                    measure={rowVirtualizer.measure}
                    showUser={
                      virtualRow.index === 1 ||
                      messages[virtualRow.index - 2].author.id !==
                        message.author.id
                    }
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      <SendMessageBar channel={channel} group={group} user={user} />
    </>
  )
}
