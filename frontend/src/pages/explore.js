import { QueryClient } from 'react-query'
import { fetchPlanets, usePlanets } from '@/lib/usePlanets'
import { galaxies } from '@/lib/galaxies'
import Image from 'next/image'
import { BiPlanet } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import { Scrollbar } from 'react-scrollbars-custom'
import React from 'react'
import { dehydrate } from 'react-query/hydration'

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

      <div className="mycontainer">
        <div className="grid gap-3 grid-cols-3">
          <div className="col-span-1">
            <div className="py-3">
              <div className="card" style={{ height: '32rem' }}>
                <Scrollbar
                  thumbYProps={{
                    style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
                  }}
                >
                  <div className="font-semibold text-secondary sticky top-0 p-3 bg-white dark:bg-gray-800 rounded-t-lg border-b dark:border-gray-700 ">
                    Galaxies
                  </div>

                  <div className="space-y-1 pl-3 py-3 text-tertiary">
                    <div className={`${galaxyClassActive} ${galaxyClass}`}>
                      all
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

          <div className="col-span-2">
            <div className="relative card pb-3 my-3">
              <div className="sticky top-14 rounded-t-lg dark:bg-gray-800 p-3 z-10 font-semibold text-secondary border-b dark:border-gray-700 flex items-center">
                {planets.length} planets in&nbsp;
                <div className="text-accent hover:underline cursor-pointer">
                  all
                </div>
                <div className="ml-auto text-accent hover:underline cursor-pointer text-sm inline-flex items-center font-medium">
                  View all posts in all
                  <FiExternalLink className="w-5 h-5 ml-3" />
                </div>
              </div>

              {planets.map((planet, index) => (
                <div
                  key={planet.id}
                  className="flex items-center py-2 px-3 transition dark:hover:bg-gray-700 cursor-pointer"
                >
                  <div className="mr-3 text-mid font-medium text-sm">
                    {index + 1}
                  </div>
                  {planet.avatarUrl ? (
                    <div className="relative w-9 h-9 rounded-full">
                      <Image
                        src={planet.avatarUrl}
                        layout="fill"
                        className="object-cover object-center rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full inline-flex">
                      <BiPlanet className="w-6 h-6 m-auto text-tertiary" />
                    </div>
                  )}

                  <div className="ml-3 text-secondary text-sm">
                    <div className="font-medium">{planet.name}</div>
                    <div className="text-tertiary text-xs mt-0.5">
                      {planet.userCount} members
                    </div>
                  </div>

                  <div className="ml-auto text-sm font-medium text-accent px-4 hover:underline">
                    Join
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
