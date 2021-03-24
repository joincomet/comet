import React from 'react'
import ExploreSidebar from '@/components/sidebars/ExploreSidebar'
import PageNavigator from '@/components/ui/PageNavigator'
import {
  IconSearch,
  IconFeatured,
  IconTop,
  IconNew,
  IconAll
} from '@/lib/Icons'
import Header from '@/components/headers/base/Header'
import ServerInfoCard from '@/components/server/ServerInfoCard'
import { categoryIcon } from '@/lib/categoryIcon'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { GET_SERVERS } from '@/graphql/queries'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/lib/stores/useStore'

export default function ExplorePage() {
  const { explorePage, setExplorePage } = useStore()

  const query = useParams()

  const variables = {
    sort: query.sort
      ? query.sort.toUpperCase()
      : query.category
      ? 'AZ'
      : 'FEATURED',
    category: explorePage
  }

  const { t } = useTranslation()

  const title = () => {
    if (query.category) return query.category
    if (!query.sort) return t('explore.featured')
    if (query.sort === 'new') return t('explore.new')
    if (query.sort === 'top') return t('explore.top')
    if (query.sort === 'az') return t('explore.az')
  }

  const [{ data }] = useQuery({ query: GET_SERVERS, variables })
  const servers = data?.getServers?.servers || []

  return (
    <>
      <ExploreSidebar />

      <Header title={title} icon={categoryIcon(explorePage)} />

      <main>
        <div className="px-8 py-8">
          <div className="flex pb-8 items-center justify-center">
            <div className="shadow-md max-w-screen-sm w-full flex h-10 relative bg-white dark:bg-gray-600 rounded-md dark:text-gray-400 transition dark:focus-within:text-white">
              <input className="h-full dark:bg-gray-600 rounded-l-md text-sm px-4 flex-grow focus:outline-none dark:text-white dark:placeholder-gray-400 font-medium" />
              <button
                type="button"
                className="rounded-r-md inline-flex justify-center items-center h-10 w-10 cursor-pointer"
              >
                <IconSearch className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="py-4 text-secondary text-xl font-semibold flex items-center">
            {
              !query.category && !query.sort && (
                <IconFeatured className="h-6 w-6 mr-3" />
              ) // Featured
            }
            {query.sort === 'top' && <IconTop className="h-6 w-6 mr-3" />}
            {query.sort === 'new' && <IconNew className="h-6 w-6 mr-3" />}
            {query.sort === 'az' && <IconAll className="h-6 w-6 mr-3" />}
            {query.category && (
              <>{categoryIcon(query.category, 'h-6 w-6 mr-3')}</>
            )}
            {title()}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5">
            {servers.map(server => (
              <ServerInfoCard planet={server} key={server.id} />
            ))}
          </div>
        </div>
        <PageNavigator nextEnabled={!!data?.nextPage} />
      </main>
    </>
  )
}
