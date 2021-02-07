import { usePlanets } from '@/lib/queries/usePlanets'
import React, { useRef } from 'react'
import ExploreLeftSidebar from '@/components/sidebars/ExploreSidebar'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbar } from 'react-scrollbars-custom'
import PageNavigator from '@/components/ui/PageNavigator'
import {
  HiSearch,
  HiCheckCircle,
  HiSortAscending,
  HiClock
} from 'react-icons/hi'
import Header from '@/components/ui/header/Header'
import PlanetInfoCard from '@/components/planet/PlanetInfoCard'
import { FaSortAlphaDown } from 'react-icons/fa'
import { galaxyIcon } from '@/lib/galaxyIcon'
import { useParams } from 'react-router-dom'

export default function ExplorePage() {
  const query = useParams()

  const variables = {
    pageSize: 20,
    page: query.page ? query.page - 1 : 0,
    sort: query.sort
      ? query.sort.toUpperCase()
      : query.galaxy
      ? 'AZ'
      : 'FEATURED',
    galaxy: query.galaxy ? query.galaxy : null
  }
  const { data } = usePlanets(variables)

  const planets = data ? data.planets : []

  const title = () => {
    if (query.galaxy) return query.galaxy + ' Planets'
    if (!query.sort) return 'Featured Planets'
    if (query.sort === 'new') return 'Recently Created Planets'
    if (query.sort === 'top') return 'Most Popular Planets'
    if (query.sort === 'az') return 'All Planets (A-Z)'
  }

  return (
    <>
      <ExploreLeftSidebar />

      <Header title="Explore Planets" mobileOnly />

      <main className="slideout-panel slideout-panel--header-mobile" id="panel">
        <AutoSizer>
          {({ width, height }) => (
            <Scrollbar mobileNative style={{ width, height }}>
              <div className="px-8 py-8">
                <div className="flex pb-8 items-center justify-center">
                  <div className="shadow-md max-w-screen-sm w-full flex h-10 relative bg-white dark:bg-gray-600 rounded-md dark:text-gray-400 transition dark:focus-within:text-white">
                    <input
                      className="h-full dark:bg-gray-600 rounded-l-md text-sm px-4 flex-grow focus:outline-none dark:text-white dark:placeholder-gray-400 font-medium"
                      placeholder="Search planets"
                    />
                    <button
                      type="button"
                      className="rounded-r-md inline-flex justify-center items-center h-10 w-10 cursor-pointer"
                    >
                      <HiSearch className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="py-4 text-secondary text-xl font-semibold flex items-center">
                  {
                    !query.galaxy && !query.sort && (
                      <HiCheckCircle className="h-6 w-6 mr-3" />
                    ) // Featured
                  }
                  {query.sort === 'top' && (
                    <HiSortAscending className="h-6 w-6 mr-3" />
                  )}
                  {query.sort === 'new' && <HiClock className="h-6 w-6 mr-3" />}
                  {query.sort === 'az' && (
                    <FaSortAlphaDown className="h-6 w-6 mr-3" />
                  )}
                  {query.galaxy && (
                    <>{galaxyIcon(query.galaxy, 'h-6 w-6 mr-3')}</>
                  )}
                  {title()}
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5">
                  {planets.map(planet => (
                    <PlanetInfoCard planet={planet} key={planet.id} />
                  ))}
                </div>
              </div>
              <PageNavigator nextEnabled={!!data?.nextPage} />
            </Scrollbar>
          )}
        </AutoSizer>
      </main>
    </>
  )
}
