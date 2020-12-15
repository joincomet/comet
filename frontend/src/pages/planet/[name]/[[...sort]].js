import CreatePostCard from '@/components/CreatePostCard'
import PostsVirtualized from '@/components/post/PostsVirtualized'
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
import Posts from '@/components/post/Posts'
import PlanetAvatar from '@/components/planet/PlanetAvatar'
import PlanetInfoCard from '@/components/planet/PlanetInfoCard'

export default function PlanetPage() {
  const router = useRouter()

  const planet = usePlanet({ name: router.query.name }).data

  const moderator =
    'w-9 h-9 relative rounded-full shadow-md cursor-pointer opacity-75 hover:opacity-100 transition transform hover:scale-105'

  return (
    <div>
      <div className="relative rounded-xl h-72 bg-gray-200 dark:bg-gray-800">
        <div className="bg-gradient-to-br from-red-400 to-blue-500 absolute inset-0 opacity-90" />

        <div className="absolute left-64 right-48 flex top-1/2 transform -translate-y-1/2 z-20">
          <div>
            <div className="mb-3 font-semibold uppercase tracking-widest text-xs">
              discussion &middot; meta/cometx
            </div>
            <div className="text-7xl font-extrabold tracking-tight">
              {planet.name}
            </div>

            <div className="h-9 rounded-full inline-flex w-32 items-center justify-center font-medium bg-blue-600 text-sm mt-6 cursor-pointer">
              Join
            </div>
          </div>

          <div className="ml-auto mt-auto text-tertiary font-semibold uppercase tracking-widest text-xs text-right">
            <div>Members</div>
            <div>{planet.userCount}</div>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-0 z-10 h-full bg-gradient-to-b from-transparent to-gray-900" />

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

          <div className="col-span-1">
            <div className="pt-3 sticky top-14">
              <PlanetInfoCard planet={planet} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getVariables = query => {
  const sort =
    query.sort && query.sort.length >= 1 ? query.sort[0].toUpperCase() : 'HOT'
  const time =
    query.sort && query.sort.length >= 2 ? query.sort[1].toUpperCase() : 'ALL'
  return { sort, time, page: 0, planet: query.name }
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  /*const variables = getVariables(ctx.query)

  await queryClient.prefetchQuery(
    ['posts', variables],
    key => fetchPosts(key, ctx),
    {
      infinite: true,
      getNextPageParam: (lastPage, pages) => lastPage.nextPage
    }
  )*/

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
