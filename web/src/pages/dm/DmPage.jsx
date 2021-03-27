import MainSidebar from '@/components/sidebars/HomeSidebar'
import React from 'react'
import { useQuery } from 'urql'
import { useParams } from 'react-router-dom'
import SendMessageBar from '@/components/message/SendMessageBar'
import Message from '@/components/message/Message'
import { GET_MESSAGES, GET_USER } from '@/graphql/queries'
import DmHeader from '@/components/headers/DmHeader'
import Container from '@/components/Container'
import View from '@/components/View'
import Scroller from '@/components/Scroller'

export default function DmPage() {
  const { userId } = useParams()
  const [{ data: userData }] = useQuery({
    query: GET_USER,
    variables: { userId }
  })
  const user = userData?.getUser

  const [{ data: messagesData }] = useQuery({
    query: GET_MESSAGES,
    variables: { userId }
  })

  const messages = messagesData?.getMessages?.messages || []

  return (
    <>
      <DmHeader user={user} />
      <MainSidebar />

      <Container>
        <View chatBar>
          <Scroller>
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
          </Scroller>
        </View>
        <SendMessageBar user={user} />
      </Container>
    </>
  )
}
