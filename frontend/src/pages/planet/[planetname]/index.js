import { QueryClient } from 'react-query'
import { globalPrefetch } from '@/lib/queries/globalPrefetch'
import { fetchPlanet, usePlanet } from '@/lib/queries/usePlanet'
import { dehydrate } from 'react-query/hydration'
import { useRouter } from 'next/router'
import PlanetSidebar from '@/components/planet/PlanetSidebar'
import PlanetUsersSidebar from '@/components/planet/PlanetUsersSidebar'
import React from 'react'
import ClassicPosts from '@/components/post/ClassicPosts'
import SendMessageBar from '@/components/layout/SendMessageBar'
import { fetchPosts } from '@/lib/queries/usePosts'
import Header from '@/components/layout/Header'
import { useSlideout } from '@/lib/useSlideout'
import SlideoutOverlay from '@/components/SlideoutOverlay'

export default function PlanetPostsPage({ variables }) {
  const { query } = useRouter()
  const planetQuery = usePlanet({ name: query.planetname })
  const planet = planetQuery.data

  const {
    slideoutRight,
    slideoutLeft,
    menuLeft,
    menuRight,
    header,
    panel
  } = useSlideout()

  return (
    <>
      <Header title={planet.name} ref={header} slideoutLeft={slideoutLeft} />
      <PlanetSidebar planet={planet} ref={menuLeft} />
      <PlanetUsersSidebar planet={planet} ref={menuRight} />
      <main
        className="slideout-panel slideout-panel--right slideout-panel--header"
        id="panel"
        ref={panel}
      >
        <SlideoutOverlay
          slideoutLeft={slideoutLeft}
          slideoutRight={slideoutRight}
        />
        <ClassicPosts variables={variables} hidePlanet />

        <SendMessageBar />
      </main>
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

  const variables = {
    planet: query.planetname,
    pageSize: 20,
    page: query.page ? query.page - 1 : 0,
    sort: query.sort ? query.sort.toUpperCase() : 'HOT',
    time: query.time ? query.time.toUpperCase() : 'ALL'
  }

  await queryClient.prefetchQuery(['posts', variables], key =>
    fetchPosts(key, ctx)
  )

  return {
    props: {
      variables,
      dehydratedState: dehydrate(queryClient)
    }
  }
}
