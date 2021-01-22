import { QueryClient } from 'react-query'
import { globalPrefetch } from '@/lib/queries/globalPrefetch'
import { fetchPlanet, usePlanet } from '@/lib/queries/usePlanet'
import { dehydrate } from 'react-query/hydration'
import { withLayout } from '@moxy/next-layout'
import ChatLayout from '@/components/layout/ChatLayout'
import { useRouter } from 'next/router'
import PlanetChatLeftSidebar from '@/components/layout/PlanetChatLeftSidebar'
import PlanetChatRightSidebar from '@/components/layout/PlanetChatRightSidebar'
import React, { useCallback, useRef, useState } from 'react'
import { usePosts } from '@/lib/queries/usePosts'
import { useVirtual } from '@/lib/virtual'
import Post from '@/components/post/Post'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbars } from 'rc-scrollbars'

function PlanetChatPage() {
  const { query } = useRouter()
  const planetQuery = usePlanet({ name: query.planetname })
  const planet = planetQuery.data
  const { data, isLoading } = usePosts({
    planet: query.planetname,
    pageSize: 20
  })
  const posts = data ? data.posts : []

  if (!planet) return <div>Planet!</div>

  return (
    <>
      <PlanetChatLeftSidebar planet={planet} />
      <PlanetChatRightSidebar planet={planet} />
      <div className="relative h-full w-full">
        <AutoSizer>
          {({ width, height }) => (
            <Scrollbars style={{ width, height }}>
              <div className="mycontainer">
                {posts.map(post => (
                  <div key={post.id}>
                    <Post post={post} />
                  </div>
                ))}
              </div>
            </Scrollbars>
          )}
        </AutoSizer>

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

export default withLayout(<ChatLayout />)(PlanetChatPage)

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
        destination: `/chat/planet/${planet.name}`,
        permanent: true
      }
    }

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
