import React from 'react'
import PlanetSidebar from '@/pages/planet/PlanetSidebar'
import ChatMessageBar from '@/components/chat/ChatMessageBar'
import Header from '@/components/ui/header/Header'
import { useParams } from 'react-router-dom'
import {
  useCurrentUserQuery,
  useMessagesQuery,
  useNewMessageSubscription
} from '@/lib/queries'
import PlanetChannelSidebar from '@/pages/channel/PlanetChannelSidebar'
import ChatMessage from '@/components/chat/ChatMessage'
import { Virtuoso } from 'react-virtuoso'

export default function PlanetChannelPage() {
  const { planetId, channelId } = useParams()
  const [{ data }] = useCurrentUserQuery()
  if (!data) return null
  const {
    currentUser: { planets }
  } = data
  const planet = planets.find(p => p.id === planetId)
  const channel = planet.channels.find(c => c.id === channelId)

  const [{ data: messagesData, fetching, error }] = useMessagesQuery({
    channelId
  })
  const [{ data: newMessagesData }] = useNewMessageSubscription({
    channelId
  })

  return (
    <>
      <Header title={`${channel.name}`} />
      <PlanetSidebar planet={planet} />
      <PlanetChannelSidebar planet={planet} />
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
            <ChatMessage
              message={message}
              showUser={
                index === 0 ||
                messagesData.messages[index - 1].author.id !== message.author.id
              }
            />
          )}
        />

        <ChatMessageBar channel={channel} />
      </main>
    </>
  )
}
