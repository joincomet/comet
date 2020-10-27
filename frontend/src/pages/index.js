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
import { setCookie } from 'nookies'
import { useState } from 'react'
import { fetchCurrentUser } from '@/hooks/useCurrentUser'
import nookies from 'nookies'

export default function Home({ cookies }) {
  const router = useRouter()

  const [layout, setLayout] = useState(
    cookies && cookies.layout ? cookies.layout : 'cards'
  )

  const changeLayout = l => {
    setLayout(l)
    setCookie(null, 'layout', l, {
      maxAge: 60 * 60 * 24 * 365 * 10,
      path: '/'
    })
  }

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

            <div className="flex items-center text-xs text-tertiary font-mono mb-5 mx-3 sm:mb-3 sm:mx-0">
              <div
                onClick={() => changeLayout('cards')}
                className={`mr-5 cursor-pointer hover:underline ${
                  layout === 'cards' ? 'font-bold text-blue-500' : ''
                }`}
              >
                Cards
              </div>
              <div
                onClick={() => changeLayout('small_cards')}
                className={`mr-5 cursor-pointer hover:underline ${
                  layout === 'small_cards' ? 'font-bold text-blue-500' : ''
                }`}
              >
                Small Cards
              </div>
              <div
                onClick={() => changeLayout('classic')}
                className={`mr-auto cursor-pointer hover:underline ${
                  layout === 'classic' ? 'font-bold text-blue-500' : ''
                }`}
              >
                Classic
              </div>
            </div>
          </div>

          <div
            className={`${
              layout === 'cards' || layout === 'small_cards'
                ? 'px-0 sm:px-5 2xl:px-80'
                : 'px-3'
            }`}
          >
            <Posts layout={layout} variables={router.query} />
          </div>
        </div>
        <RightSidebar />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const queryCache = new QueryCache()
  await queryCache.prefetchQuery(['posts', ctx.query], fetchPosts, {
    infinite: true,
    getFetchMore: (lastPage, allPages) => [ctx.query, lastPage.nextPage]
  })
  await queryCache.prefetchQuery(['currentUser'], fetchCurrentUser)

  return {
    props: {
      cookies: nookies.get(ctx),
      dehydratedState: dehydrate(queryCache)
    }
  }
}
