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
import Layout from '@/components/Layout'
import { fetchPlanet, usePlanet } from '@/hooks/usePlanet'
import Image from 'next/image'
import { FiPlusCircle } from 'react-icons/fi'
import Tippy from '@tippyjs/react'

function PlanetPage() {
  const router = useRouter()

  const { data } = usePlanet({ name: router.query.name })

  const planet = data

  const moderator =
    'w-9 h-9 relative rounded-full shadow-md cursor-pointer opacity-75 hover:opacity-100 transition transform hover:scale-105'

  return (
    <div>
      <GalaxiesSlider />

      <div className="relative mx-3 2xl:mx-24 mt-3 rounded-xl shadow-md h-64">
        <div className="bg-gradient-to-b from-transparent to-gray-900 absolute inset-0 z-10 opacity-90" />

        <div className="absolute right-3 bottom-3 z-10 flex space-x-3">
          <Tippy content="@Dan">
            <div className={moderator}>
              <Image
                src="/avatar.jpg"
                layout="fill"
                className="rounded-full object-cover object-center"
              />
            </div>
          </Tippy>

          <Tippy content="@Dan">
            <div className={moderator}>
              <Image
                src="/avatar.jpg"
                layout="fill"
                className="rounded-full object-cover object-center"
              />
            </div>
          </Tippy>
        </div>

        <div className="z-10 absolute inset-center flex flex-col items-center">
          <div className="h-28 w-28 shadow-md rounded-full relative ring-4 ring-amber-500 transition transform cursor-pointer hover:scale-102">
            <Image
              src={planet.avatarURL}
              layout="fill"
              className="rounded-full object-cover object-center"
            />
          </div>
          <div className="mt-3 text-2xl font-semibold inline-flex items-center">
            {planet.name}
            <FiPlusCircle size={20} className="text-amber-500 ml-1.5" />
          </div>
          <div className="text-secondary text-sm">
            {planet.profile.description}
          </div>
          <div className="mt-1 text-xs text-secondary inline-flex items-center">
            <div className="w-2 h-2 mr-2 rounded-full bg-green-500" />
            5,000 online
            <div className="w-2 h-2 ml-3 mr-2 rounded-full bg-gray-300" />
            100,000 members
          </div>
        </div>

        {planet.bannerURL ? (
          <Image
            src={planet.bannerURL}
            layout="fill"
            className="object-cover object-center rounded-xl"
          />
        ) : (
          <div>No banner</div>
        )}
      </div>

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

export default withLayout(<Layout />)(PlanetPage)

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

  await queryClient.prefetchQuery(
    ['planet', { name: ctx.query.name }],
    fetchPlanet
  )

  const dehydratedState = dehydrate(queryClient)
  for (const query of dehydratedState.queries) {
    if (query.state.fetchMeta === undefined) query.state.fetchMeta = null
    if (query.state.data === undefined) query.state.data = null
  }

  return {
    props: {
      dehydratedState
    }
  }
}

/*
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

export default function PlanetPage() {
  const router = useRouter()

  const sort =
    router.query.sort && router.query.sort.length >= 1
      ? router.query.sort[0].toUpperCase()
      : 'HOT'
  const time =
    router.query.sort && router.query.sort.length >= 2
      ? router.query.sort[1].toUpperCase()
      : 'ALL'

  return (
    <Layout>
      <div>{router.query.name}</div>
      <div>{sort}</div>
      <div>{time}</div>
    </Layout>
  )
}

const getVariables = query => {
  const sort =
    query.sort && query.sort.length >= 1 ? query.sort[0].toUpperCase() : 'HOT'
  const time =
    query.sort && query.sort.length >= 2 ? query.sort[1].toUpperCase() : 'ALL'
  return { sort, time }
}
*/
