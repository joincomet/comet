import Layout from '../components/Layout'
import GalaxiesSlider from '@/components/GalaxiesSlider'
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
import SortDropdown from '@/components/SortDropdown'
import GoogleOneTap from '@/components/GoogleOneTap'
import { AnimatePresence, motion } from 'framer-motion'

export default function HomePage({ cookies }) {
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

    window.scrollTo({ top: window.scrollY + 1 })
    window.scrollTo({ top: window.scrollY - 1 })
  }

  const { isLoading, isError, data, error } = usePosts(
    getVariables(router.query)
  )

  if (isLoading || isError) return null

  return (
    <>
      <style jsx>{`
        .virtual-list {
          flex-basis: auto !important;
        }
      `}</style>

      <GoogleOneTap />

      <Layout>
        <GalaxiesSlider />
        <div className="pt-5 px-5 sm:px-72">
          <CreatePostCard />
        </div>
        <Header />
        <div>
          <Posts layout={layout} variables={getVariables(router.query)} />
        </div>
      </Layout>
    </>
  )
}

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
    <>
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="fixed inset-x-center bottom-8 px-16 py-2 text-white font-medium text-sm rounded-full bg-blue-500 shadow z-10 cursor-pointer"
          >
            Create post
          </motion.div>
        )}
      </AnimatePresence>

      <header
        style={{ top: '-1px' }}
        className={`z-10 sticky h-16 px-5 sm:px-72 flex items-center transition ${
          isSticky ? 'dark:bg-gray-800 bg-white shadow-md' : 'bg-transparent'
        }`}
        ref={ref}
        {...rest}
      >
        <SearchBar
          slashFocus={true}
          className={`w-full h-10 text-sm px-16 rounded-full outline-none transition duration-200 ease-in-out border border-gray-200 dark:border-gray-800 focus:border-blue-500 ${
            isSticky
              ? 'dark:bg-gray-700 bg-gray-100'
              : 'dark:bg-gray-800 bg-white'
          }`}
        />
        <SortDropdown />
      </header>
    </>
  )
}

const getVariables = query => {
  const sort =
    query.sort && query.sort.length >= 1 ? query.sort[0].toUpperCase() : 'HOT'
  const time =
    query.sort && query.sort.length >= 2 ? query.sort[1].toUpperCase() : 'ALL'
  return { sort, time }
}

export async function getServerSideProps(ctx) {
  const queryCache = new QueryCache()

  const variables = getVariables(ctx.query)

  await queryCache.prefetchQuery(['posts', variables], fetchPosts, {
    infinite: true,
    getFetchMore: (lastPage, allPages) => [variables, lastPage.nextPage]
  })
  await queryCache.prefetchQuery(['currentUser'], fetchCurrentUser)

  return {
    props: {
      cookies: nookies.get(ctx),
      dehydratedState: dehydrate(queryCache)
    }
  }
}
