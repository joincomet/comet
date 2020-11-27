import Layout from '../components/Layout'
import GalaxiesSlider from '@/components/GalaxiesSlider'
import CreatePostCard from '@/components/CreatePostCard'
import Posts from '@/components/post/Posts'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchPosts } from '@/hooks/usePosts'
import { useRouter } from 'next/router'
import React from 'react'
import GoogleOneTap from '@/components/GoogleOneTap'
import Header from "@/components/Header";

export default function HomePage() {
  const router = useRouter()

  return (
    <>
      <GoogleOneTap />

      <Layout>
        <GalaxiesSlider />
        <div className="pt-3 px-3 2xl:px-72">
          <CreatePostCard />
        </div>
        <Header />
        <div>
          <Posts variables={getVariables(router.query)} />
        </div>
      </Layout>
    </>
  )
}

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
