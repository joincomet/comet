import ExploreSidebar from '@/pages/explore/ExploreSidebar'
import { IconSearch } from '@/components/ui/icons/Icons'
import ServerInfoCard from '@/components/server/ServerInfoCard'
import { useStore } from '@/hooks/useStore'
import Page from '@/components/ui/page/Page'
import PageView from '@/components/ui/page/PageView'
import { useState } from 'react'
import { usePublicServersQuery } from '@/graphql/hooks'

export default function ExplorePage() {
  const [page, setPage] = useState(0)

  const [exploreCategory, exploreSort] = useStore(s => [
    s.exploreCategory,
    s.exploreSort
  ])

  const { data } = usePublicServersQuery({
    variables: {
      sort: exploreSort,
      category:
        exploreCategory && exploreCategory !== 'Featured'
          ? exploreCategory
          : null,
      featured: exploreCategory === 'Featured',
      page,
      pageSize: 20
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'cache-first'
  })
  const servers = data?.publicServers ?? []

  return (
    <Page leftSidebar={<ExploreSidebar />}>
      <PageView>
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
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5">
            {servers.map(server => (
              <ServerInfoCard server={server} key={server.id} />
            ))}
          </div>
        </div>
      </PageView>
    </Page>
  )
}
