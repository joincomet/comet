import Layout from '../components/Layout'
import RightSidebar from '@/components/right-sidebar/RightSidebar'
import GalaxiesSlider from '@/components/GalaxiesSlider'
import { RiFireLine } from 'react-icons/ri'
import SearchBar from '@/components/SearchBar'
import CreatePostCard from '@/components/CreatePostCard'
import Posts from '@/components/post/Posts'
import { QueryCache } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchPosts, usePosts } from '@/components/post/usePosts'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import React, { useState, useEffect } from 'react'
import { fetchCurrentUser } from '@/hooks/useCurrentUser'
import nookies from 'nookies'
import { InView } from 'react-intersection-observer'

function Header({ children, sticky = false, className, ...rest }) {
  const [isSticky, setIsSticky] = useState(false)
  const ref = React.createRef()

  // mount
  useEffect(() => {
    const cachedRef = ref.current,
      observer = new IntersectionObserver(
        ([e]) => setIsSticky(e.intersectionRatio < 1),
        { threshold: [1] }
      )

    observer.observe(cachedRef)

    // unmount
    return function () {
      observer.unobserve(cachedRef)
    }
  }, [])

  return (
    <header
      style={{ top: '-1px' }}
      className={`sticky h-16 px-5 sm:px-72 flex items-center transition-150 ${
        isSticky ? 'z-10 dark:bg-gray-800 shadow-lg' : 'dark:bg-gray-900'
      }`}
      ref={ref}
      {...rest}
    >
      <SearchBar
        slashFocus={true}
        className={`shadow w-full h-10 text-sm px-16 rounded-full outline-none transition duration-200 ease-in-out border border-gray-300 dark:border-gray-800 focus:border-blue-500 ${
          isSticky ? 'dark:bg-gray-700' : 'dark:bg-gray-800'
        }`}
      />
      <div className="h-10 px-8 inline-flex items-center cursor-pointer text-sm hover:text-blue-500 transition duration-150 ease-in-out text-tertiary">
        <RiFireLine className="w-4 h-4 mr-4" />
        Hot
      </div>
      {/*<SortDropdown />*/}
    </header>
  )
}

export default function Home({ cookies }) {
  const router = useRouter()

  const [layout, setLayout] = useState(
    cookies && cookies.layout ? cookies.layout : 'cards'
  )

  const [showTopBar, setShowTopBar] = useState(false)

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

      <Layout showTopBar={showTopBar}>
        <div className="page">
          <GalaxiesSlider />
          <div className="pt-5 px-5 sm:px-72">
            <CreatePostCard />
          </div>
          {/*<InView onChange={(inView, entry) => setShowTopBar(!inView)}>

            </InView>*/}
          <Header />
          <div className="py-5 px-5 sm:px-72">
            <div className="flex items-center font-header text-disabled pb-5 px-3">
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
