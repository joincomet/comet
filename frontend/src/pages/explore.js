import { QueryClient } from 'react-query'
import { fetchPlanets, usePlanets } from '@/lib/queries/usePlanets'
import { galaxies } from '@/lib/galaxies'

import { BiPlanet } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import { Scrollbar } from 'react-scrollbars-custom'
import React from 'react'
import { dehydrate } from 'react-query/hydration'
import PlanetAvatar from '@/components/planet/PlanetAvatar'
import { fetchCurrentUser } from '@/lib/queries/useCurrentUser'

const galaxyClass =
  'text-sm cursor-pointer transition hover:text-blue-500 dark:hover:text-blue-500'

const galaxyClassActive = 'text-blue-500'

export default function ExplorePage() {
  const planets = usePlanets({ pageSize: 50 }).data

  const planet = planets[0]

  return (
    <>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div,
        div#__next > div > div {
          height: 100%;
        }
      `}</style>

      <div className="mycontainer mt-14">
        <div className="grid gap-6 grid-cols-3">
          <div className="col-span-1">
            <div className="sticky top-14 pt-6">
              <div
                className="bg-white dark:bg-gray-900 rounded"
                style={{ height: '32rem' }}
              >
                <Scrollbar
                  thumbYProps={{
                    style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                  }}
                >
                  <div className="font-semibold text-secondary sticky top-0 p-3 bg-white dark:bg-gray-900 rounded-t-lg border-b dark:border-gray-800 ">
                    Galaxies
                  </div>

                  <div className="space-y-1 pl-3 py-3 text-tertiary">
                    <div className={`${galaxyClassActive} ${galaxyClass}`}>
                      All
                    </div>
                    {galaxies.map(galaxy => (
                      <div key={galaxy} className={galaxyClass}>
                        {galaxy}
                      </div>
                    ))}
                  </div>
                </Scrollbar>
              </div>
            </div>
          </div>

          <div className="col-span-2 py-6">
            <div className="relative bg-white dark:bg-gray-900 rounded pb-3">
              <div className="sticky top-14 rounded-t-lg bg-white dark:bg-gray-900 p-3 z-10 font-semibold text-secondary border-b dark:border-gray-800 flex items-center">
                {planets.length} planets in&nbsp;
                <div className="text-accent hover:underline cursor-pointer">
                  All
                </div>
                <div className="ml-auto text-accent hover:underline cursor-pointer text-sm inline-flex items-center font-medium">
                  View all posts in All
                  <FiExternalLink className="w-5 h-5 ml-3" />
                </div>
              </div>

              {planets.map((planet, index) => (
                <div
                  key={planet.id}
                  className="flex items-center py-2 px-3 transition dark:hover:bg-gray-800 cursor-pointer"
                >
                  <div className="mr-3 text-mid font-medium text-sm">
                    {index + 1}
                  </div>
                  <PlanetAvatar planet={planet} className="w-9 h-9" />

                  <div className="ml-3 text-secondary text-sm">
                    <div className="font-medium">{planet.name}</div>
                    <div className="text-tertiary text-xs mt-0.5">
                      {planet.userCount} members
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('currentUser', () => fetchCurrentUser(ctx))

  await queryClient.prefetchQuery(['planets', { pageSize: 50 }], key =>
    fetchPlanets(key, ctx)
  )
  const dehydratedState = dehydrate(queryClient)
  return {
    props: {
      dehydratedState
    }
  }
}
