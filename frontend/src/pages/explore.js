import { usePlanets } from '@/lib/queries/usePlanets'
import { galaxiesMap } from '@/lib/galaxiesMap'
import { FiExternalLink, FiUserPlus } from 'react-icons/fi'
import NavLink from '@/components/NavLink'
import { useRouter } from 'next/router'
import React from 'react'
import ExploreLeftSidebar from '@/components/explore/ExploreLeftSidebar'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbars } from 'rc-scrollbars'
import { HiCheckCircle, HiClock, HiSortAscending } from 'react-icons/hi'

export default function ExplorePage() {
  const planets = usePlanets({ sort: 'TOP' }).data || []

  const { push } = useRouter()

  return (
    <>
      <ExploreLeftSidebar />

      <div className="relative h-full w-full">
        <AutoSizer>
          {({ width, height }) => (
            <Scrollbars style={{ width, height }}>
              <div className="ml-64 md:px-8 mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-5">
                {planets.slice(0, 20).map(planet => (
                  <div
                    key={planet.id}
                    onClick={() => push(`/planet/${planet.name}`)}
                    className="md:rounded-xl group shadow dark:bg-gray-900 relative flex flex-col transform transition hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                  >
                    <div className="absolute inline-flex items-center justify-center w-32 h-32 transition rounded-full group-hover:shadow-md -top-3 left-4 dark:bg-gray-850">
                      {planet.avatarUrl ? (
                        <img
                          src={planet.avatarUrl}
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        <div className="header-2 text-mid">
                          {planet.name[0]}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end h-32 pt-4 pl-32 pr-4 text-right">
                      <div className="inline-flex items-center">
                        <div className="mr-3 font-medium text-green-600 text-13">
                          {parseInt(Math.random() * planet.userCount)} online
                        </div>
                        <div className="w-2 h-2 bg-green-600 rounded-full" />
                      </div>
                      <div className="inline-flex items-center">
                        <div className="mr-3 font-medium text-13 text-tertiary">
                          {planet.userCount} member
                          {planet.userCount === 1 ? '' : 's'}
                        </div>
                        <div className="w-2 h-2 bg-gray-600 rounded-full" />
                      </div>
                    </div>

                    <div className="flex flex-col flex-grow px-4 pt-1 pb-4">
                      <div className="mb-0.5 text-13 font-medium text-mid break-long-words">
                        {planet.galaxies && planet.galaxies.length > 0
                          ? planet.galaxies.map(
                              galaxy => galaxiesMap[galaxy]
                            )[0]
                          : 'Uncategorized'}
                      </div>
                      <div className="text-xl font-medium text-secondary">
                        {planet.name}
                      </div>

                      <div className="text-sm text-tertiary line-clamp-2">
                        {planet.description || 'New CometX Planet'}
                      </div>

                      <div className="flex items-center pt-4 mt-auto space-x-4">
                        <div className="inline-flex items-center justify-center w-full text-sm font-medium transition border rounded hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-800 text-tertiary h-9">
                          Join
                          <FiUserPlus className="w-5 h-5 ml-3" />
                        </div>
                        <NavLink
                          href={`/planet/${planet.name}`}
                          className="inline-flex items-center justify-center w-full text-sm font-medium transition border rounded hover:bg-gray-200 dark:hover:bg-gray-800 dark:border-gray-800 text-tertiary h-9"
                        >
                          Enter
                          <FiExternalLink className="w-5 h-5 ml-3" />
                        </NavLink>
                      </div>
                    </div>

                    {/*{planet.galaxies && planet.galaxies.length > 0 && (
                <div className="pt-24 mt-auto font-medium text-13">
                  {planet.galaxies
                    .map(galaxy => galaxiesMap[galaxy])
                    .join(', ')}
                </div>
              )}*/}
                  </div>
                ))}
              </div>
            </Scrollbars>
          )}
        </AutoSizer>
      </div>
    </>
  )
}

/*
export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  /!*await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: allPostsQueryVars,
  })*!/

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1
  })
}
*/
