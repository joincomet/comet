import CreatePostCard from '@/components/CreatePostCard'
import Posts from '@/components/post/Posts'
import { QueryClient } from 'react-query'
import { fetchPosts } from '@/lib/usePosts'
import { useRouter } from 'next/router'
import React from 'react'
import { withLayout } from '@moxy/next-layout'
import CreatePostFAB from '@/components/CreatePostFAB'
import { fetchPlanet, usePlanet } from '@/lib/usePlanet'
import Image from 'next/image'
import { FiPlusCircle } from 'react-icons/fi'
import Tippy from '@tippyjs/react'
import { dehydrate } from 'react-query/hydration'

function PlanetPage() {
  const router = useRouter()

  const planet = usePlanet({ name: router.query.name }).data

  const moderator =
    'w-9 h-9 relative rounded-full shadow-md cursor-pointer opacity-75 hover:opacity-100 transition transform hover:scale-105'

  return (
    <div>
      <div className="relative rounded-xl h-64 shadow-md bg-gray-200 dark:bg-gray-800">
        <div className="bg-gradient-to-br from-red-400 to-blue-500 absolute inset-0 opacity-90" />

        <div className="absolute right-3 bottom-3 flex space-x-3">
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

        {planet.bannerUrl && (
          <Image
            src={planet.bannerUrl}
            layout="fill"
            className="object-cover object-center"
          />
        )}
      </div>

      <div className="mycontainer">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <div className="my-3">
              <CreatePostCard />
            </div>

            <Posts variables={getVariables(router.query)} showPlanet={false} />
          </div>
        </div>
      </div>

      <CreatePostFAB />
    </div>
  )
}

export default withLayout()(PlanetPage)

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
