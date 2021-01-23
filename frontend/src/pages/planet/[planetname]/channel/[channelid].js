import { QueryClient } from 'react-query'
import { fetchPlanet, usePlanet } from '@/lib/queries/usePlanet'
import { dehydrate } from 'react-query/hydration'
import { useRouter } from 'next/router'
import PlanetSidebar from '@/components/sidebars/PlanetSidebar'
import PlanetUsersSidebar from '@/components/sidebars/PlanetUsersSidebar'
import React from 'react'
import Posts from '@/components/post/Posts'
import ChatMessageBar from '@/components/chat/ChatMessageBar'

export default function PlanetChatPage() {
  const { query } = useRouter()
  const planetQuery = usePlanet({ name: query.planetname })
  const planet = planetQuery.data

  if (!planet) return <div>Planet!</div>

  return (
    <>
      <PlanetSidebar planet={planet} />
      <PlanetUsersSidebar planet={planet} />
      <main
        className="slideout-panel slideout-panel--right slideout-panel--header"
        id="panel"
      >
        <Posts variables={{ planet: query.planetname, pageSize: 20 }} />

        <ChatMessageBar />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const { query } = ctx

  const k = ['planet', { name: query.planetname }]

  await queryClient.prefetchQuery(k, key => fetchPlanet(key, ctx))

  const planet = queryClient.getQueryData(k)

  if (query.planetname !== planet.name)
    return {
      redirect: {
        destination: `/planet/${planet.name}`,
        permanent: true
      }
    }

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
