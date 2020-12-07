import Layout from '@/components/Layout'
import GalaxiesSlider from '@/components/GalaxiesSlider'
import CreatePostCard from '@/components/CreatePostCard'
import Posts from '@/components/post/Posts'
import { QueryClient } from 'react-query'
import { fetchPosts } from '@/lib/usePosts'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Header from '@/components/Header'
import { withLayout } from '@moxy/next-layout'
import CreatePostFAB from '@/components/CreatePostFAB'
import { fetchCurrentUser } from '@/lib/useCurrentUser'
import { dehydrate } from '@/lib/dehydrate'
import Grass from '@/components/home/Grass'
import Telescope from '@/components/home/Telescope'
import { BiPlanet } from 'react-icons/bi'
import { usePrevious } from 'react-use'

const boxContainer =
  'relative flex-grow h-24 transform transition hover:scale-105 cursor-pointer col-span-1'

const box =
  'dark:bg-gray-800 shadow-md rounded-2xl w-full h-full inline-flex items-center justify-center text-secondary text-sm'

const boxBg = 'absolute inset-0 transform -rotate-6 bg-blue-500 rounded-2xl'

function HomePage() {
  const router = useRouter()

  const [variables, setVariables] = useState(getVariables(router.query))
  const prevVariables = usePrevious(variables)

  return (
    <div>
      <GalaxiesSlider />

      <div
        style={{
          backgroundImage:
            'radial-gradient(ellipse at top , #18181B 0%,  #27272A 95%)'
        }}
        className="h-64 relative"
      >
        <Grass className="absolute bottom-0 left-0 text-gray-900 w-1/2" />
        <Grass className="absolute bottom-0 right-0 text-gray-900 w-1/2" />
        <Telescope className="absolute bottom-0 right-24 h-48 text-gray-900" />
      </div>

      <div className="-mt-64 z-10 relative">
        <div className="mt-9 sm:mx-3 2xl:mx-72 hidden sm:block z-10">
          <CreatePostCard />
        </div>
        <Header />

        <div className="mt-14 pt-3 sm:mt-0 sm:pt-0">
          <Posts variables={router.query.login ? prevVariables : variables} />
        </div>
      </div>

      <CreatePostFAB />
    </div>
  )
}

export default withLayout()(HomePage)

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

  await queryClient.prefetchQuery(
    ['posts', variables],
    key => fetchPosts(key, ctx),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage
    }
  )

  await queryClient.prefetchQuery(['currentUser'], () => fetchCurrentUser(ctx))

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      dehydratedState
    }
  }
}
