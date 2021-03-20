import React, { useEffect, useRef } from 'react'
import ServerSidebar from '@/components/sidebars/ServerSidebar'
import SendMessageBar from '@/components/message/SendMessageBar'
import Header from '@/components/headers/base/Header'
import ChannelSidebar from '@/components/sidebars/ChannelUsersSidebar'
import { useQuery } from 'urql'
import { GET_MESSAGES } from '@/graphql/queries'
import {
  useChannel,
  useServer
} from '@/components/providers/ServerDataProvider'
import MainContainer from '@/components/MainContainer'
import MainView from '@/components/MainView'
import { IconChannel } from '@/lib/Icons'
import Message from '@/components/message/Message'

export default function ChannelPage() {
  const server = useServer()
  const channel = useChannel()

  const [{ data: messagesData }] = useQuery({
    query: GET_MESSAGES,
    variables: { channelId: channel.id }
  })

  const messages = messagesData?.getMessages?.messages || []

  const ref = useRef(null)

  useEffect(() => {
    setTimeout(() => (ref.current.scrollTop = ref.current.scrollHeight))
  }, [])

  useEffect(() => {
    if (
      ref &&
      !!messages.length &&
      messages[messages.length - 1].author.isCurrentUser
    )
      setTimeout(() => (ref.current.scrollTop = ref.current.scrollHeight))
  }, [messages.length])

  return (
    <>
      <Header
        icon={<IconChannel className="w-5 h-5" />}
        title={`${channel.name}`}
      />
      <ServerSidebar server={server} />
      <ChannelSidebar server={server} />
      <MainContainer rightSidebar>
        <MainView chatBar ref={ref}>
          {messages.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              showUser={
                index === 0 ||
                messages[index - 1].author.id !== message.author.id
              }
            />
          ))}
        </MainView>
        <SendMessageBar channel={channel} />
      </MainContainer>
    </>
  )
}
