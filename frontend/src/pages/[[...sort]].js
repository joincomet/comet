import Layout from '../components/Layout'
import GalaxiesSlider from '@/components/GalaxiesSlider'
import CreatePostCard from '@/components/CreatePostCard'
import Posts from '@/components/post/Posts'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchPosts } from '@/hooks/usePosts'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import GoogleOneTap from '@/components/GoogleOneTap'
import Header from '@/components/Header'
import { FiEdit } from 'react-icons/fi'
import Image from 'next/image'
import NavLink from '@/components/NavLink'
import { usePlanets } from '@/hooks/usePlanets'
import { withLayout } from '@moxy/next-layout'
import CreatePostFAB from '@/components/CreatePostFAB'

function HomePage() {
  const router = useRouter()

  return (
    <div>
      <GoogleOneTap />

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

function TopPlanets() {
  const { isLoading, isError, data, error } = usePlanets({
    sort: 'TOP',
    pageSize: 50
  })

  if (isLoading || isError) return null

  return (
    <div>
      {data.map(planet => (
        <NavLink
          className="flex items-center text-xs font-medium text-tertiary h-8"
          key={planet.id}
          href="/+[planet]"
          as={`/+${planet.name}`}
        >
          {planet.avatarURL ? (
            <Image
              width={20}
              height={20}
              src={planet.avatarURL}
              className="w-5 h-5 rounded-full"
              alt={planet.name}
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700" />
          )}

          <span className="ml-6">{planet.name}</span>
        </NavLink>
      ))}
    </div>
  )
}
