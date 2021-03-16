import React from 'react'
import ServerSidebar from '@/pages/server/ServerSidebar'
import SendMessageBar from '@/components/message/SendMessageBar'
import Header from '@/components/ui/header/Header'
import { useParams } from 'react-router-dom'
import ChannelSidebar from '@/pages/channel/ChannelSidebar'
import Message from '@/components/message/Message'
import { Virtuoso } from 'react-virtuoso'
import { useQuery } from 'urql'
import { GET_MESSAGES } from '@/graphql/queries'
import { useChannel, useServer } from '@/components/ServerDataProvider'

export default function ChannelPage() {
  const server = useServer()
  const channel = useChannel()

  const [{ data: messagesData }] = useQuery({
    query: GET_MESSAGES,
    variables: { channelId: channel.id }
  })

  return (
    <>
      <Header title={`${channel.name}`} />
      <ServerSidebar server={server} />
      <ChannelSidebar server={server} />
      <main className="ml-76 mr-60 pt-12 dark:bg-gray-750 h-full">
        <SendMessageBar channel={channel} />
      </main>
    </>
  )
}
