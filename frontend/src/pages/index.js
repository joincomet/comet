import { useRouter } from 'next/router'
import React from 'react'
import HomeSidebar from '@/components/home/HomeSidebar'
import Posts from '@/components/post/Posts'
import Header from '@/components/layout/Header'
import PostsSidebar from '@/components/post/FoldersSidebar'
import { useSlideout } from '@/lib/useSlideout'
import { HiFolder } from 'react-icons/hi'

export default function HomePage() {
  const {
    panel,
    header,
    menuLeft,
    menuRight,
    slideoutLeft,
    slideoutRight
  } = useSlideout()

  const { query } = useRouter()

  const variables = {
    joinedOnly: true,
    pageSize: 20,
    page: query.page ? query.page - 1 : 0,
    sort: query.sort ? query.sort.toUpperCase() : 'HOT',
    time: query.time ? query.time.toUpperCase() : 'ALL'
  }

  return (
    <>
      <HomeSidebar ref={menuLeft} />

      <PostsSidebar ref={menuRight} />

      <Header
        slideoutLeft={slideoutLeft}
        ref={header}
        title="Home"
        slideoutRight={slideoutRight}
        rightSidebarIcon={<HiFolder className="w-5 h-5" />}
      />

      <main
        className="slideout-panel slideout-panel--right slideout-panel--header"
        id="panel"
        ref={panel}
      >
        <Posts
          variables={variables}
          planet
          draggable
          link
          thumbnail
          expandable
        />
      </main>
    </>
  )
}

/*
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
*/
