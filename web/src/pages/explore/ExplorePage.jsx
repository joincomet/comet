import ExploreSidebar from '@/pages/explore/ExploreSidebar'
import ServerInfoCard from '@/components/server/ServerInfoCard'
import { useStore } from '@/hooks/useStore'
import Page from '@/components/ui/page/Page'
import PageView from '@/components/ui/page/PageView'
import { usePublicServersQuery } from '@/graphql/hooks'
import EndReached from '@/components/ui/EndReached'
import { Helmet } from 'react-helmet-async'
import Header from '@/components/ui/header/Header'
import { IconExplore } from '@/components/ui/icons/Icons'
import Avatar from '@/components/ui/Avatar'

const NUMBER_OF_SKELETON_INFO_CARDS = 21

export default function ExplorePage() {
  const [exploreCategory, exploreSort] = useStore(s => [
    s.exploreCategory,
    s.exploreSort
  ])

  const { data, loading } = usePublicServersQuery({
    variables: {
      sort: exploreSort,
      category:
        exploreCategory && exploreCategory !== 'Featured'
          ? exploreCategory
          : null,
      featured: exploreCategory === 'Featured'
    },
    fetchPolicy: 'cache-and-network'
    //nextFetchPolicy: 'cache-first'
  })
  const servers = data?.publicServers ?? []

  const skeletonInfoCards = []
  for (let i = 0; i < NUMBER_OF_SKELETON_INFO_CARDS; i++) {
    skeletonInfoCards.push(
      <div className={`relative flex flex-col w-full rounded-lg group dark:bg-gray-800 bg-white animate-pulse`}>
        <div
          className="h-32 rounded-t-lg w-full bg-cover bg-center bg-no-repeat relative dark:bg-gray-700 bg-gray-200"
          
        >
          <div className="absolute left-4 -bottom-3">
            <Avatar
              size={10}
              className="dark:bg-gray-750 rounded-xl ring-4 dark:ring-gray-800 ring-white bg-gray-300"
            />
          </div>
        </div>

        <div className="flex flex-col flex-grow px-4 pt-5 pb-4 h-40">
          <div className="text-lg font-semibold text-secondary h-5 w-3/4 dark:bg-gray-750 bg-gray-300 rounded-full">
            
          </div>

          <div className="text-13 text-tertiary line-clamp-3 pt-1 h-5 w-1/2 dark:bg-gray-750 bg-gray-300 rounded-full mt-3">
            
          </div>

          <div className="flex mt-auto text-xs">
            <div className="inline-flex items-center h-5 w-1/2 dark:bg-gray-750 bg-gray-300 rounded-full">
              
            </div>

            <div className="ml-auto inline-flex items-center  h-5 w-1/4 dark:bg-gray-750 bg-gray-300 rounded-full">
              
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Page
      leftSidebar={<ExploreSidebar />}
      header={
        <Header title="Explore" icon={<IconExplore className="w-5 h-5" />} />
      }
    >
      <Helmet>
        <title>Explore Planets – Comet</title>
      </Helmet>
      <PageView>
        <div className="md:px-8 md:py-8 px-0 py-0">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 2xl:grid-cols-5">
            {!loading && servers ? servers.map(server => (
              <ServerInfoCard server={server} key={server.id} />
            )) : skeletonInfoCards}
          </div>
          {!loading && !servers.length && <EndReached>Nothing here yet!</EndReached>}
        </div>
      </PageView>
    </Page>
  )
}
