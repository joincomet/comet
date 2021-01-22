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
        {((slideoutLeft && slideoutLeft.isOpen()) ||
          (slideoutRight && slideoutRight.isOpen())) && (
          <div
            className="fixed z-10 inset-0"
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
              slideoutLeft.close()
              slideoutRight.close()
            }}
          />
        )}

        <ClassicPosts variables={variables} />
      </main>
    </>
  )
}

export async function getStaticProps(ctx) {
  const queryClient = new QueryClient()

  const variables = {
    joinedOnly: true,
    pageSize: 20,
    page: 0,
    sort: 'HOT',
    time: 'ALL'
  }

  await queryClient.prefetchQuery(['posts', variables], key =>
    fetchPosts(key, ctx)
  )

  return {
    props: {
      variables,
      dehydratedState: dehydrate(queryClient)
    },
    revalidate: 1
  }
}
