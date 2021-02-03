import { QueryClient } from 'react-query'
import { fetchPlanet, usePlanet } from '@comet/core/queries/usePlanet'
import { dehydrate } from 'react-query/hydration'
import { useRouter } from 'next/router'
import PlanetSidebar from '@/components/sidebars/PlanetSidebar'
import PlanetUsersSidebar from '@/components/sidebars/PlanetUsersSidebar'
import React from 'react'
import Posts from '@/components/post/Posts'
import ChatMessageBar from '@/components/chat/ChatMessageBar'
import Header from '@/components/ui/header/Header'

export default function PlanetChatPage() {
  const { query } = useRouter()
  const planetQuery = usePlanet({ name: query.planetName })
  const planet = planetQuery.data
  const channel = planet.channels.find(c => c.name === query.channelName)

  return (
    <>
      <Header title={`${channel.name}`} />
      <PlanetSidebar planet={planet} />
      <PlanetUsersSidebar planet={planet} />
      <main
        className="slideout-panel slideout-panel--right slideout-panel--header"
        id="panel"
      >
        <ChatMessageBar />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const { query } = ctx

  const k = ['planet', { name: query.planetName }]

  await queryClient.prefetchQuery(k, key => fetchPlanet(key, ctx))

  const planet = queryClient.getQueryData(k)

  if (query.planetName !== planet.name)
    return {
      redirect: {
        destination: `/planet/${planet.name}/channel/${query.channelName}`,
        permanent: true
      }
    }

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
