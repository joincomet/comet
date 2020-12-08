import { QueryClient } from 'react-query'
import { fetchPlanets, usePlanets } from '@/lib/usePlanets'
import { dehydrate } from '@/lib/dehydrate'
import { galaxies } from '@/lib/galaxies'
import Image from 'next/image'
import { BiPlanet } from 'react-icons/bi'

const galaxyClass =
  'text-sm cursor-pointer transition hover:text-blue-500 dark:hover:text-blue-500'

const galaxyClassActive = 'text-blue-500'

export default function ExplorePage() {
  const planets = usePlanets({ pageSize: 50 }).data

  return (
    <div>
      <div className="bg-blue-500 p-12">
        <div>Explore Planets</div>
      </div>

      <div className="mx-3 2xl:mx-72 py-6 grid gap-6 grid-cols-3">
        <div className="col-span-1">
          <div className="rounded-lg dark:bg-gray-800 shadow-md p-3">
            <div className="font-semibold text-secondary pb-3 mb-3 border-b dark:border-gray-700 ">
              Galaxies
            </div>
            <div className="space-y-1 text-tertiary">
              <div className={`${galaxyClassActive} ${galaxyClass}`}>all</div>
              {galaxies.map(galaxy => (
                <div key={galaxyClass} className={galaxyClass}>
                  {galaxy}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="rounded-lg dark:bg-gray-800 shadow-md p-3">
            <div className="pb-3 font-semibold text-secondary border-b dark:border-gray-700">
              {planets.length} planets in{' '}
              <span className="text-accent">all</span>
            </div>
            <div className="divide-y divide-gray-700">
              {planets.map(planet => (
                <div key={planet.id} className="flex items-center py-1.5">
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
                    {planet.name}
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
    </div>
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
