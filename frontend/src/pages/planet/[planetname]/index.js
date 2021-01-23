import { QueryClient } from 'react-query'
import { fetchPlanet, usePlanet } from '@/lib/queries/usePlanet'
import { dehydrate } from 'react-query/hydration'
import { useRouter } from 'next/router'
import PlanetSidebar from '@/components/sidebars/PlanetSidebar'
import React from 'react'
import Posts from '@/components/post/Posts'
import Header from '@/components/ui/header/Header'
import { useSlideout } from '@/lib/useSlideout'
import FoldersSidebar from '@/components/sidebars/FoldersSidebar'
import { HiFolder } from 'react-icons/hi'
import HeaderNewPostButton from '@/components/ui/header/HeaderNewPostButton'

export default function PlanetPostsPage() {
  const { query } = useRouter()
  const variables = {
    planet: query.planetname,
    pageSize: 20,
    page: query.page ? query.page - 1 : 0,
    sort: query.sort ? query.sort.toUpperCase() : 'HOT',
    time: query.time ? query.time.toUpperCase() : 'ALL'
  }
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

  const title =
    'Posts · ' +
    (query.sort
      ? query.sort.toUpperCase().substring(0, 1) +
        query.sort.toLowerCase().substring(1)
      : 'Hot') +
    (query.time
      ? ' · ' +
        query.time.toUpperCase().substring(0, 1) +
        query.time.toLowerCase().substring(1)
      : '')

  return (
    <>
      <Header
        ref={header}
        {...{ slideoutLeft, slideoutRight, title }}
        rightSidebarIcon={<HiFolder className="w-5 h-5" />}
      >
        <HeaderNewPostButton />
      </Header>
      <PlanetSidebar planet={planet} ref={menuLeft} />
      <FoldersSidebar ref={menuRight} />
      <main
        className="slideout-panel slideout-panel--right slideout-panel--header"
        id="panel"
        ref={panel}
      >
        <Posts variables={variables} draggable link thumbnail expandable />
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
