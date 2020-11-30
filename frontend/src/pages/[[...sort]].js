import Layout from '@/components/Layout'
import GalaxiesSlider from '@/components/GalaxiesSlider'
import CreatePostCard from '@/components/CreatePostCard'
import Posts from '@/components/post/Posts'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchPosts } from '@/hooks/usePosts'
import { useRouter } from 'next/router'
import React from 'react'
import Header from '@/components/Header'
import { withLayout } from '@moxy/next-layout'
import CreatePostFAB from '@/components/CreatePostFAB'

function HomePage() {
  const router = useRouter()

  return (
    <div>
      <GalaxiesSlider />
      <div className="pt-3 sm:px-3 2xl:px-72 hidden sm:block">
        <CreatePostCard />
      </div>
      <Header />

      <div className="mt-14 pt-3 sm:mt-0 sm:pt-0">
        <Posts variables={getVariables(router.query)} />
      </div>

      <CreatePostFAB />
    </div>
  )
}

export default withLayout(<Layout />)(HomePage)

const getVariables = query => {
  const sort =
    query.sort && query.sort.length >= 1 ? query.sort[0].toUpperCase() : 'HOT'
  const time =
    query.sort && query.sort.length >= 2 ? query.sort[1].toUpperCase() : 'ALL'
  return { sort, time, page: 0 }
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const variables = getVariables(ctx.query)

  await queryClient.prefetchQuery(['posts', variables], fetchPosts, {
    getNextPageParam: (lastPage, pages) => lastPage.nextPage
  })

  const dehydratedState = dehydrate(queryClient)
  for (const query of dehydratedState.queries) {
    if (query.state.fetchMeta === undefined) query.state.fetchMeta = null
  }

  return {
    props: {
      dehydratedState
    }
  }
}
