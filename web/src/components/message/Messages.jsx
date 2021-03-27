import React, { useEffect, useRef } from 'react'
import Scroller from '@/components/Scroller'
import Message from '@/components/message/Message'
import { useQuery } from 'urql'
import { GET_MESSAGES } from '@/graphql/queries'

export default function Messages({ variables = {} }) {
  const [{ data: messagesData }] = useQuery({
    query: GET_MESSAGES,
    variables
  })

  const messages = messagesData?.getMessages || []

  const ref = useRef(null)

  useEffect(() => {
    if (
      ref &&
      ref.current &&
      messages.length > 0 &&
      messages[messages.length - 1].author.isCurrentUser
    )
      setTimeout(
        () =>
          (ref.current.parentElement.scrollTop =
            ref.current.parentElement.scrollHeight)
      )
  }, [messages.length])

  return (
    <Scroller ref={ref}>
      {messages.map((message, index) => (
        <Message
          key={message.id}
          message={message}
          showUser={
            index === 0 || messages[index - 1].author.id !== message.author.id
          }
        />
      ))}
    </Scroller>
  )
}
