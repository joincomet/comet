import { QueryClient } from 'react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { fetchPlanet, usePlanet } from '@/lib/usePlanet'
import Image from 'next/image'
import { dehydrate } from 'react-query/hydration'
import Posts from '@/components/post/Posts'
import PlanetAvatar from '@/components/planet/PlanetAvatar'
import { useInView } from 'react-intersection-observer'
import UserAvatar from '@/components/user/UserAvatar'
import UserPopup from '@/components/user/UserPopup'
import SortOptions from '@/components/SortOptions'

export default function PlanetPage() {
  const router = useRouter()

  const planet = usePlanet({ name: router.query.name }).data

  const { ref, inView, entry } = useInView()

  return (
    <div>
      <div className="relative h-80 z-0">
        <div className="bg-gradient-to-br from-red-400 to-blue-500 absolute inset-0 opacity-90 z-0" />

        <div className="absolute inset-x-0 bottom-0 top-14 flex flex-col md:flex-row items-center md:items-end align-center z-20 mycontainer pt-6 md:pb-12">
          <div className="flex flex-col w-full h-full items-center md:items-start justify-end">
            <div className="font-semibold uppercase tracking-widest text-xs text-secondary">
              discussion &middot; meta/cometx
            </div>
            <div className="md:text-7xl text-4xl font-extrabold tracking-tight leading-none mt-4">
              {planet.name}
            </div>

            <div className="block md:hidden text-tertiary font-semibold uppercase tracking-widest text-xs text-right mt-4">
              {planet.userCount} Members
            </div>

            <div className="h-9 rounded-full inline-flex w-32 items-center justify-center font-medium bg-blue-600 text-sm mt-8 cursor-pointer">
              Join
            </div>
          </div>

          <div className="hidden md:block mt-auto text-tertiary font-semibold uppercase tracking-widest text-xs text-right">
            <div>Members</div>
            <div>{planet.userCount}</div>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-0 z-10 h-full bg-gradient-to-b from-transparent dark:to-gray-850" />

        {planet.bannerUrl && (
          <Image
            src={planet.bannerUrl}
            layout="fill"
            className="object-cover object-center"
          />
        )}
      </div>

      <div className="mycontainer py-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 xl:col-span-2">
            <SortOptions />
            <Posts variables={getVariables(router.query)} showPlanet={false} />
          </div>

          <div className="col-span-0 xl:col-span-1">
            <div>
              <div className="text-xl font-bold tracking-tight leading-none mb-6 text-secondary">
                About
              </div>
              <div className="text-sm text-secondary font-medium">
                {planet.description}
              </div>

              <div className="text-xl font-bold tracking-tight leading-none my-6 text-secondary">
                Related Planets
              </div>
              <div className="flex items-center mt-4">
                <PlanetAvatar planet={planet} className="w-9 h-9" />
                <div className="ml-4 font-semibold text-sm text-secondary">
                  {planet.name}
                </div>
              </div>

              <div className="text-xl font-bold tracking-tight leading-none my-6 text-secondary">
                Moderators
              </div>

              {planet.moderators.map(mod => (
                <UserPopup user={mod} key={mod.id}>
                  <div className="flex items-center mt-4 cursor-pointer">
                    <UserAvatar user={mod} className="w-9 h-9" />
                    <div className="ml-4 font-semibold text-sm text-secondary">
                      {mod.name}
                    </div>
                  </div>
                </UserPopup>
              ))}
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
