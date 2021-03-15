import React from 'react'
import ExploreSidebar from '@/pages/explore/ExploreSidebar'
import PageNavigator from '@/components/ui/PageNavigator'
import {
  HiSearch,
  HiCheckCircle,
  HiSortAscending,
  HiClock
} from 'react-icons/hi'
import Header from '@/components/ui/header/Header'
import ServerInfoCard from '@/components/server/ServerInfoCard'
import { FaSortAlphaDown } from 'react-icons/fa'
import { categoryIcon } from '@/lib/categoryIcon'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { GET_SERVERS } from '@/graphql/queries'

export default function ExplorePage() {
  const query = useParams()

  const variables = {
    pageSize: 20,
    page: query.page ? query.page - 1 : 0,
    sort: query.sort
      ? query.sort.toUpperCase()
      : query.category
      ? 'AZ'
      : 'FEATURED',
    category: query.category ? query.category : null
  }

  const title = () => {
    if (query.category) return query.category + ' Planets'
    if (!query.sort) return 'Featured Planets'
    if (query.sort === 'new') return 'Recently Created Planets'
    if (query.sort === 'top') return 'Most Popular Planets'
    if (query.sort === 'az') return 'All Planets (A-Z)'
  }

  const [{ data }] = useQuery({ query: GET_SERVERS, variables })
  const servers = data?.getServers?.servers || []

  return (
    <>
      <ExploreSidebar />

      <Header />

      <main>
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
              !query.category && !query.sort && (
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
            {query.category && (
              <>{categoryIcon(query.category, 'h-6 w-6 mr-3')}</>
            )}
            {title()}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5">
            {servers.map(planet => (
              <ServerInfoCard planet={planet} key={planet.id} />
            ))}
          </div>
        </div>
        <PageNavigator nextEnabled={!!data?.nextPage} />
      </main>
    </>
  )
}
