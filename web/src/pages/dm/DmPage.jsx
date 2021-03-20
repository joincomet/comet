import MainSidebar from '@/components/sidebars/HomeSidebar'
import React from 'react'
import { useQuery, useSubscription } from 'urql'
import { useParams } from 'react-router-dom'
import SendMessageBar from '@/components/message/SendMessageBar'
import Message from '@/components/message/Message'
import { Virtuoso } from 'react-virtuoso'
import { GET_MESSAGES, GET_USER } from '@/graphql/queries'
import LoadingScreen from '@/pages/LoadingScreen'
import {
  MESSAGE_REMOVED,
  MESSAGE_SENT,
  MESSAGE_UPDATED
} from '@/graphql/subscriptions'
import DmHeader from '@/components/headers/DmHeader'
import MainContainer from '@/components/MainContainer'
import MainView from '@/components/MainView'

export default function DmPage() {
  const { userId } = useParams()
  const [{ data: userData }] = useQuery({
    query: GET_USER,
    variables: { userId }
  })
  const user = userData?.getUser

  const [{ data: messagesData }] = useQuery({
    query: GET_MESSAGES,
    variables: { page: 0, userId }
  })

  const messages = messagesData?.getMessages?.messages || []

  return (
    <>
      <DmHeader user={user} />
      <MainSidebar />

      <MainContainer>
        <MainView chatBar>
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
        <SendMessageBar user={user} />
      </MainContainer>
    </>
  )
}
