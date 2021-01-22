import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import HomeSidebar from '@/components/home/HomeSidebar'
import ClassicPosts from '@/components/post/ClassicPosts'
import Header from '@/components/layout/Header'
import PostsSidebar from '@/components/post/FoldersSidebar'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchPosts } from '@/lib/queries/usePosts'
import { useSlideout } from '@/lib/useSlideout'
import { globalPrefetch } from '@/lib/queries/globalPrefetch'
import SlideoutOverlay from '@/components/SlideoutOverlay'

export default function HomePage({ variables }) {
  const {
    panel,
    header,
    menuLeft,
    menuRight,
    slideoutLeft,
    slideoutRight
  } = useSlideout()

  return (
    <>
      <HomeSidebar ref={menuLeft} />

      <PostsSidebar ref={menuRight} />

      <Header slideoutLeft={slideoutLeft} ref={header} />

      <main
        className="slideout-panel slideout-panel--right slideout-panel--header"
        id="panel"
        ref={panel}
      >
        <SlideoutOverlay
          slideoutLeft={slideoutLeft}
          slideoutRight={slideoutRight}
        />
        <ClassicPosts variables={variables} />
      </main>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const { query } = ctx

  await globalPrefetch(queryClient, ctx)

  const variables = {
    joinedOnly: true,
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
