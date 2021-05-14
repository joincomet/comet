import ExploreSidebar from '@/pages/explore/ExploreSidebar'
import { IconSearch } from '@/components/ui/icons/Icons'
import ServerInfoCard from '@/components/server/ServerInfoCard'
import { useStore } from '@/hooks/useStore'
import Page from '@/components/ui/page/Page'
import PageView from '@/components/ui/page/PageView'
import { useState } from 'react'
import { usePublicServersQuery } from '@/graphql/hooks'
import EndReached from '@/components/ui/EndReached'

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
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5">
            {servers.map(server => (
              <ServerInfoCard server={server} key={server.id} />
            ))}
          </div>
          {!servers.length && <EndReached>Nothing here yet!</EndReached>}
        </div>
      </PageView>
    </Page>
  )
}
