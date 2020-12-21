import { QueryClient } from 'react-query'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { fetchPlanet, usePlanet } from '@/lib/queries/usePlanet'
import Image from 'next/image'
import { dehydrate } from 'react-query/hydration'
import Posts from '@/components/post/Posts'
import PlanetAvatar from '@/components/planet/PlanetAvatar'
import { useInView } from 'react-intersection-observer'
import UserAvatar from '@/components/user/UserAvatar'
import UserPopup from '@/components/user/UserPopup'
import SortOptions from '@/components/sort/SortOptions'
import { fetchPosts } from '@/lib/queries/usePosts'
import { useHeaderStore } from '@/lib/stores'
import { FiCalendar } from 'react-icons/fi'
import PlanetJoinButton from '@/components/planet/PlanetJoinButton'
import PlanetHeader from '@/components/planet/PlanetHeader'
import CreatePostButton from '@/components/createpost/CreatePostButton'

export default function PlanetPage({ variables }) {
  const { query } = useRouter()

  const planet = usePlanet({ name: query.planetname }).data

  const { ref, inView } = useInView({ threshold: 0.8 })

  const { setDark } = useHeaderStore()

  useEffect(() => setDark(!inView), [inView])

  return (
    <div>
      <PlanetHeader planet={planet} show={!inView} />

      <CreatePostButton />

      <div className="relative h-80 z-0">
        <div className="bg-gradient-to-br from-red-400 to-blue-500 absolute inset-0 opacity-90 z-0" />

        <div className="absolute inset-x-0 bottom-0 top-14 flex flex-col md:flex-row items-center md:items-end align-center z-20 mycontainer pt-3 md:pt-6 md:pb-12">
          <div className="flex flex-col items-center md:items-start md:flex-row flex-grow mt-auto">
            <div className="label block md:hidden mb-4">
              {!planet.galaxies || planet.galaxies.length === 0 ? (
                <span className="hover:underline cursor-pointer">
                  uncategorized
                </span>
              ) : (
                planet.galaxies.map((galaxy, index) => (
                  <span key={galaxy} className="hover:underline cursor-pointer">
                    {index !== 0 && <span>&nbsp;&middot;&nbsp;</span>}
                    {galaxy}
                  </span>
                ))
              )}
            </div>
            <PlanetAvatar
              className="w-20 h-20 md:w-40 md:h-40 shadow-md mr-0 md:mr-6"
              planet={planet}
            />

            <div className="flex flex-col w-full md:h-full items-center md:items-start justify-end space-y-4">
              <div className="label hidden md:block">
                {!planet.galaxies || planet.galaxies.length === 0 ? (
                  <span className="hover:underline cursor-pointer">
                    uncategorized
                  </span>
                ) : (
                  planet.galaxies.map((galaxy, index) => (
                    <span
                      key={galaxy}
                      className="hover:underline cursor-pointer"
                    >
                      {index !== 0 && <span>&nbsp;&middot;&nbsp;</span>}
                      {galaxy}
                    </span>
                  ))
                )}
              </div>
              <div className="header-1" ref={ref}>
                {planet.name}
              </div>

              <div className="block md:hidden text-tertiary label text-right">
                {planet.userCount} Members
              </div>

              <PlanetJoinButton planet={planet} />
            </div>
          </div>

          <div className="hidden md:block mt-auto text-tertiary label text-right">
            <div>Members</div>
            <div>{planet.userCount}</div>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-0 z-10 h-full bg-gradient-to-b from-transparent dark:to-gray-850 to-gray-100" />

        {planet.bannerUrl && (
          <Image
            src={planet.bannerUrl}
            layout="fill"
            objectFit="cover"
            className="select-none"
          />
        )}
      </div>

      <div className="mycontainer">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 xl:col-span-2 py-6">
            <SortOptions />
            <Posts variables={variables} showPlanet={false} />
          </div>

          <div className="col-span-0 xl:col-span-1">
            <div className="sticky top-28 pt-6">
              <div className="text-xl font-bold tracking-tight leading-none mb-4 text-secondary">
                About <span className="">{planet.name}</span>
              </div>
              <div className="text-sm text-secondary font-medium">
                {planet.description || 'New Planet'}
              </div>

              <div className="mt-4 text-tertiary text-xs font-medium inline-flex items-center">
                <FiCalendar size={16} className="mr-3" />
                Created {planet.timeSinceCreated}
              </div>

              <div className="text-xl font-bold tracking-tight leading-none mt-6 mb-4 text-secondary">
                Moderators
              </div>

              <div className="space-y-4">
                {planet.moderators.map(mod => (
                  <div className="block" key={mod.id}>
                    <UserPopup user={mod} placement="left-start">
                      <div className="flex items-center cursor-pointer">
                        <UserAvatar user={mod} className="w-9 h-9" />
                        <div className="ml-4 font-semibold text-sm text-secondary">
                          {mod.name}
                        </div>
                      </div>
                    </UserPopup>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getVariables = query => {
  const sort = query.sort ? query.sort.toUpperCase() : 'HOT'
  const time = query.time ? query.time.toUpperCase() : 'ALL'
  return { sort, time, planet: query.planetname }
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const { query } = ctx

  const variables = getVariables(query)

  await queryClient.prefetchInfiniteQuery(
    ['posts', variables],
    key => fetchPosts(key, ctx),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage
    }
  )

  await queryClient.prefetchQuery(['planet', { name: query.planetname }], key =>
    fetchPlanet(key, ctx)
  )

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)))

  return {
    props: {
      dehydratedState,
      variables
    }
  }
}
