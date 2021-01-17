import { QueryClient } from 'react-query'
import { globalPrefetch } from '@/lib/queries/globalPrefetch'
import { fetchPlanet, usePlanet } from '@/lib/queries/usePlanet'
import { dehydrate } from 'react-query/hydration'
import { useRouter } from 'next/router'
import PlanetSidebar from '@/components/planet/PlanetSidebar'
import PlanetUsersSidebar from '@/components/planet/PlanetUsersSidebar'
import React from 'react'
import ClassicPosts from '@/components/post/ClassicPosts'

export default function PlanetChatPage() {
  const { query } = useRouter()
  const planetQuery = usePlanet({ name: query.planetname })
  const planet = planetQuery.data

  if (!planet) return <div>Planet!</div>

  return (
    <>
      <PlanetSidebar planet={planet} />
      <PlanetUsersSidebar planet={planet} />
      <div className="relative h-full w-full px-64">
        <ClassicPosts variables={{ planet: query.planetname, pageSize: 20 }} />

        <div className="fixed bottom-0 p-6 left-80 right-64 dark:bg-gray-800">
          <input
            className="h-12 px-3 w-full dark:bg-gray-750 rounded text-sm focus:outline-none text-secondary"
            placeholder="Send a message in #general"
          />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const { query } = ctx

  await globalPrefetch(queryClient, ctx)

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
