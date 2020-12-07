import GalaxiesSlider from '@/components/GalaxiesSlider'
import CreatePostCard from '@/components/CreatePostCard'
import Posts from '@/components/post/Posts'
import { QueryClient } from 'react-query'
import { fetchPosts } from '@/lib/usePosts'
import { useRouter } from 'next/router'
import React from 'react'
import Header from '@/components/Header'
import { withLayout } from '@moxy/next-layout'
import CreatePostFAB from '@/components/CreatePostFAB'
import Layout from '@/components/Layout'
import { fetchPlanet, usePlanet } from '@/lib/usePlanet'
import Image from 'next/image'
import { FiPlusCircle } from 'react-icons/fi'
import Tippy from '@tippyjs/react'
import { FiMessageCircle, FiFolder, FiBook } from 'react-icons/fi'
import { BiPlanet } from 'react-icons/bi'
import { dehydrate } from '@/lib/dehydrate'

const tab =
  'transform hover:bg-blue-500 dark:hover:bg-blue-500 rounded-full hover:-translate-y-0.5 bg-white dark:bg-gray-900 hover:text-white dark:hover:text-white transition px-6 h-9 inline-flex items-center text-sm select-none cursor-pointer'

const selectedTab = 'text-blue-500 font-semibold'
const unselectedTab = 'text-gray-600 dark:text-gray-400'

function PlanetPage() {
  const router = useRouter()

  const planet = usePlanet({ name: router.query.name }).data

  const moderator =
    'w-9 h-9 relative rounded-full shadow-md cursor-pointer opacity-75 hover:opacity-100 transition transform hover:scale-105'

  return (
    <div>
      <GalaxiesSlider />

      <div className="relative mx-3 mt-3 rounded-xl h-64 shadow-md bg-gray-200 dark:bg-gray-800">
        <div className="bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900 absolute inset-0 z-10 opacity-90" />

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
          <div className="h-28 w-28 shadow-md rounded-full relative ring-4 ring-blue-500 transition transform cursor-pointer hover:scale-102">
            <Image
              src={planet.avatarUrl}
              layout="fill"
              className="rounded-full object-cover object-center"
            />
          </div>
          <div className="mt-3 text-2xl font-semibold inline-flex items-center text-primary">
            {planet.name}
            <FiPlusCircle size={20} className="text-blue-500 ml-1.5" />
          </div>
          <div className="text-secondary text-sm line-clamp-2">
            {planet.profile.description}
          </div>
          <div className="mt-1 text-xs text-secondary inline-flex items-center">
            <div className="w-2 h-2 mr-2 rounded-full bg-green-500" />
            5,000 online
            <div className="w-2 h-2 ml-3 mr-2 rounded-full bg-gray-300" />
            100,000 members
          </div>
        </div>

        {planet.bannerUrl ? (
          <Image
            src={planet.bannerUrl}
            layout="fill"
            className="object-cover object-center rounded-xl"
          />
        ) : (
          <div>No banner</div>
        )}
      </div>

      <div className="mt-3 2xl:mx-72 flex items-center">
        <div className="inline-flex space-x-3 mx-auto">
          <div className={`${tab} ${selectedTab}`}>
            <BiPlanet size={20} className="mr-3" />
            Feed
          </div>
          <div className={`${tab} ${unselectedTab}`}>
            <FiBook size={20} className="mr-3" />
            Rules
          </div>
          <div className={`${tab} ${unselectedTab}`}>
            <FiFolder size={20} className="mr-3" />
            Folders
          </div>
          <div className={`${tab} ${unselectedTab}`}>
            <FiMessageCircle size={20} className="mr-3" />
            Chat
          </div>
        </div>
      </div>

      <div className="pt-3 sm:px-3 2xl:px-72 hidden sm:block">
        <CreatePostCard />
      </div>
      <Header />

      <div className="mt-14 pt-3 sm:mt-0 sm:pt-0">
        <Posts variables={getVariables(router.query)} showPlanet={false} />
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
  return { sort, time, page: 0, planet: query.name }
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

  await queryClient.prefetchQuery(['planet', { name: ctx.query.name }], key =>
    fetchPlanet(key, ctx)
  )

  const dehydratedState = dehydrate(queryClient)

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
