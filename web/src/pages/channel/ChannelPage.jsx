import React from 'react'
import PlanetSidebar from '@/pages/server/ServerSidebar'
import SendMessageBar from '@/components/message/SendMessageBar'
import Header from '@/components/ui/header/Header'
import { useParams } from 'react-router-dom'
import PlanetChannelSidebar from '@/pages/channel/ChannelSidebar'
import Message from '@/components/message/Message'
import { Virtuoso } from 'react-virtuoso'
import { useQuery } from 'urql'
import { GET_JOINED_SERVERS, GET_MESSAGES } from '@/graphql/queries'

export default function ChannelPage() {
  const { planetId, channelId } = useParams()
  const [{ data: servers }] = useQuery({ query: GET_JOINED_SERVERS })
  const server = servers.find(p => p.id === planetId)
  const channel = server.channels.find(c => c.id === channelId)

  const [{ data: messagesData, fetching, error }] = useQuery({
    query: GET_MESSAGES,
    variables: { channelId }
  })

  return (
    <>
      <Header title={`${channel.name}`} />
      <PlanetSidebar planet={server} />
      <PlanetChannelSidebar planet={server} />
      <main className="ml-76 mr-60 pt-12 dark:bg-gray-750 h-full">
        <Virtuoso
          followOutput={isAtBottom =>
            isAtBottom ||
            !messagesData ||
            messagesData.messages[messagesData.messages.length - 1].author
              .isCurrentUser
          }
          alignToBottom
          data={messagesData ? messagesData.messages : []}
          overscan={200}
          className="scrollbar-thin scrollbar-thumb-gray-850 scrollbar-track-gray-775 scrollbar-thumb-rounded-md mr-1"
          style={{ height: 'calc(100% - 5.875rem)' }}
          itemContent={(index, message) => (
            <Message
              message={message}
              showUser={
                index === 0 ||
                messagesData.messages[index - 1].author.id !== message.author.id
              }
            />
          )}
        />

        <SendMessageBar channel={channel} />
      </main>
    </>
  )
}
