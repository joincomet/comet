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
import { AnimatePresence, motion } from 'framer-motion'
import { useHeaderStore } from '@/lib/stores'
import { FiMoreHorizontal, FiCalendar } from 'react-icons/fi'

export default function PlanetPage({ variables }) {
  const { query } = useRouter()

  const planet = usePlanet({ name: query.planetname }).data

  const { ref, inView, entry } = useInView({ threshold: 0.8 })

  const { setDark } = useHeaderStore()

  useEffect(() => setDark(!inView), [inView])

  return (
    <div>
      <AnimatePresence>
        {!inView && (
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="fixed z-50 top-14 left-64 right-0 h-14 flex items-center dark:bg-gray-900 px-8 border-b dark:border-gray-800"
          >
            <PlanetAvatar planet={planet} />
            <div className="ml-4 text-xl font-bold tracking-tight leading-none">
              {planet.name}
            </div>

            <div className="ml-auto">
              <JoinButton planet={planet} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-80 z-0">
        <div className="bg-gradient-to-br from-red-400 to-blue-500 absolute inset-0 opacity-90 z-0" />

        <div className="absolute inset-x-0 bottom-0 top-14 flex flex-col md:flex-row items-center md:items-end align-center z-20 mycontainer pt-6 md:pb-12">
          <div className="flex flex-grow">
            <PlanetAvatar
              className="w-40 h-40 shadow-md mr-6"
              planet={planet}
            />

            <div className="flex flex-col w-full h-full items-center md:items-start justify-end space-y-4">
              <div className="font-semibold uppercase tracking-widest text-xs text-secondary">
                <span className="hover:underline cursor-pointer">
                  discussion
                </span>
                &nbsp;&middot;&nbsp;
                <span className="hover:underline cursor-pointer">
                  meta/cometx
                </span>
              </div>
              <div
                className="md:text-7xl text-4xl font-extrabold tracking-tight leading-none"
                ref={ref}
              >
                {planet.name}
              </div>

              <div className="block md:hidden text-tertiary font-semibold uppercase tracking-widest text-xs text-right">
                {planet.userCount} Members
              </div>

              <JoinButton planet={planet} />
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
            <Posts variables={variables} showPlanet={false} />
          </div>

          <div className="col-span-0 xl:col-span-1">
            <div>
              <div className="text-xl font-bold tracking-tight leading-none mb-6 text-secondary">
                About
              </div>
              <div className="text-sm text-secondary font-medium">
                {planet.description || 'New Planet'}
              </div>

              <div className="mt-4 text-tertiary text-xs font-medium inline-flex items-center">
                <FiCalendar size={16} className="mr-3" />
                Created {planet.timeSinceCreated}
              </div>

              <div className="text-xl font-bold tracking-tight leading-none my-6 text-secondary">
                Moderators
              </div>

              <div className="space-y-4">
                {planet.moderators.map(mod => (
                  <UserPopup user={mod} key={mod.id} placement="left-start">
                    <div className="inline-flex items-center cursor-pointer">
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
    </div>
  )
}

function JoinButton({ planet }) {
  return (
    <div className="inline-flex items-center">
      <div
        className={`h-8 rounded-full inline-flex w-32 items-center justify-center uppercase text-xs font-semibold tracking-widest cursor-pointer transition transform hover:scale-105 ${
          planet.joined
            ? 'bg-black bg-opacity-25 border border-gray-400 text-blue-500'
            : 'bg-blue-600'
        }`}
      >
        {planet.joined ? 'Joined' : 'Join'}
      </div>

      <div className="ml-4 w-8 h-8 rounded-full border border-gray-400 bg-black bg-opacity-25 inline-flex items-center justify-center cursor-pointer transition transform hover:scale-105">
        <FiMoreHorizontal size={20} />
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

  const dehydratedState = dehydrate(queryClient)
  dehydratedState.queries[0].state.data.pageParams = [0]

  return {
    props: {
      dehydratedState,
      variables
    }
  }
}
