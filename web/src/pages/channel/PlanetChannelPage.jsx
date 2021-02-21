import React from 'react'
import PlanetSidebar from '@/pages/planet/PlanetSidebar'
import ChatMessageBar from '@/components/chat/ChatMessageBar'
import Header from '@/components/ui/header/Header'
import { useParams } from 'react-router-dom'
import { useCurrentUserQuery } from '@/lib/queries'
import PlanetChannelSidebar from '@/pages/channel/PlanetChannelSidebar'

export default function PlanetChannelPage() {
  const { planetId, channelId } = useParams()
  const [{ data }] = useCurrentUserQuery()
  if (!data) return null
  const {
    currentUser: { planets }
  } = data
  const planet = planets.find(p => p.id === planetId)
  const channel = planet.channels.find(c => c.id === channelId)

  return (
    <>
      <Header title={`${channel.name}`} />
      <PlanetSidebar planet={planet} />
      <PlanetChannelSidebar planet={planet} />
      <main>
        <ChatMessageBar channel={channel} />
      </main>
    </>
  )
}
