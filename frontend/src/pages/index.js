import Layout from '../components/Layout'
import RightSidebar from '@/components/right-sidebar/RightSidebar'
import GalaxiesSlider from '@/components/GalaxiesSlider'
import { RiFireLine } from 'react-icons/ri'
import SearchBar from '@/components/SearchBar'
import CreatePostCard from '@/components/CreatePostCard'
import Posts from '@/components/post/Posts'
import { QueryCache } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchPosts, usePosts } from '@/hooks/usePosts'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const { isLoading, isError, data, error } = usePosts(router.query)

  if (isLoading || isError) return null

  return (
    <>
      <style jsx>{`
        .virtual-list {
          flex-basis: auto !important;
        }
      `}</style>

      <Layout>
        <div className="page">
          <GalaxiesSlider />
          <div className="container pt-5 mx-auto sm:px-5 2xl:px-80">
            <CreatePostCard />

            <div className="flex items-center mb-5 px-3 sm:px-0">
              <SearchBar
                slashFocus={true}
                className="shadow-md w-full h-10 text-sm px-16 rounded-full dark:bg-gray-800 outline-none transition duration-200 ease-in-out border border-gray-800 focus:border-blue-500"
              />
              <div className="h-10 px-8 inline-flex items-center cursor-pointer text-sm hover:text-blue-500 transition duration-150 ease-in-out text-tertiary">
                <RiFireLine className="w-4 h-4 mr-4" />
                Hot
              </div>
              {/*<SortDropdown />*/}
            </div>

            <div className="flex items-center text-xs text-tertiary font-mono space-x-5 mb-3 px-6">
              <span className="font-bold cursor-pointer hover:underline">
                Cards
              </span>
              <span className="cursor-pointer hover:underline">Condensed</span>
            </div>
          </div>

          <div className="pt-5 sm:px-3">
            <Posts variables={router.query} />
          </div>
        </div>
        <RightSidebar />
      </Layout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const queryCache = new QueryCache()
  await queryCache.prefetchQuery(['posts', query], fetchPosts, {
    infinite: true,
    getFetchMore: (lastPage, allPages) => [query, lastPage.nextPage]
  })

  return {
    props: {
      dehydratedState: dehydrate(queryCache)
    }
  }
}
