import Layout from '../components/Layout'
import GalaxiesSlider from '@/components/GalaxiesSlider'
import CreatePostCard from '@/components/CreatePostCard'
import Posts from '@/components/post/Posts'
import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { fetchPosts } from '@/hooks/usePosts'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import GoogleOneTap from '@/components/GoogleOneTap'
import Header from '@/components/Header'
import {
  FiHome,
  FiSearch,
  FiBell,
  FiMail,
  FiEdit,
  FiFolder,
  FiUser
} from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '@/components/Logo'
import Image from 'next/image'
import { HiCog } from 'react-icons/hi'
import NavLink from '@/components/NavLink'
import { BiHomeAlt } from 'react-icons/bi'
import { CgInfinity } from 'react-icons/cg'
import { usePlanets } from '@/hooks/usePlanets'

const bottomButton = 'h-16 w-full inline-flex cursor-pointer'

export default function HomePage() {
  const router = useRouter()

  const [sidebar, setSidebar] = useState(false)

  return (
    <>
      <GoogleOneTap />

      <Layout>
        <GalaxiesSlider />
        <div className="pt-3 sm:px-3 2xl:px-72 hidden sm:block">
          <CreatePostCard />
        </div>
        <Header />

        <div className="sm:hidden flex fixed top-0 left-0 right-0 items-center h-14 border-b dark:border-gray-700 dark:bg-gray-800 shadow-md z-10">
          <div
            onClick={() => setSidebar(true)}
            className="rounded-full dark:bg-gray-700 inline-flex h-8 w-8 ml-3 mr-5"
          >
            <FiUser size={16} className="text-gray-500 m-auto" />
          </div>
          <span className="font-medium text-lg">Home</span>
          <div className="w-14 h-14 inline-flex ml-auto">
            <FiBell size={20} className="text-tertiary m-auto" />
          </div>
        </div>

        <div
          className={`h-full w-64 z-30 fixed left-0 top-0 bottom-0 shadow-md dark:bg-gray-800 transform transition ${
            sidebar ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="border-b dark:border-gray-700 p-3">
            <Logo className="h-4" />
          </div>

          <div className="h-16 p-3 cursor-pointer items-center flex border-b dark:border-gray-700">
            <div className="w-8 h-8 relative">
              <div className="absolute w-2.5 h-2.5 ring dark:ring-gray-800 ring-white bg-green-500 rounded-full bottom-0 right-0 z-10" />
              <Image
                src="/avatar.jpg"
                width={32}
                height={32}
                className="rounded-full object-cover object-center"
              />
            </div>

            <div className="ml-4">
              <div className="text-xs text-primary font-medium">
                Dan Beneventano
              </div>
              <div className="text-xs mt-0.5 text-tertiary font-medium">
                @Dan
              </div>
            </div>

            <div className="ml-auto mr-1.5 p-1.5 transition transform hover:rotate-12 hover:scale-110 dark:hover:bg-gray-900 hover:bg-gray-200 rounded-full">
              <HiCog size={20} className="text-disabled" />
            </div>
          </div>

          <div className="text-gray-500 border-b dark:border-gray-700">
            <NavLink href="/" className={`sidebar-item`}>
              <BiHomeAlt className="w-5 h-5" />
              <span className="ml-6">Home</span>
            </NavLink>
            <NavLink href="/universe" className="sidebar-item">
              <CgInfinity className="w-5 h-5" />
              <span className="ml-6">Universe</span>
            </NavLink>
            <NavLink href="/universe" className="sidebar-item">
              <HiOutlineSparkles className="w-5 h-5" />
              <span className="ml-6">Galaxies</span>
            </NavLink>
          </div>

          <div className="p-3">
            <div className="text-tertiary text-xs font-medium pb-3">
              My Planets
            </div>
            <div className="px-3 border-b dark:border-gray-700 relative">
              <div className="h-8 absolute left-0 top-0 bottom-0 inline-flex items-center px-3">
                <FiSearch size={16} className="text-disabled" />
              </div>

              <input
                type="text"
                placeholder="Search planets"
                className="w-full h-8 text-xs px-10 bg-transparent border-none focus:ring-0"
              />
            </div>

            <div className="mt-3 px-3">
              <TopPlanets />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {sidebar && (
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 0.75
              }}
              exit={{
                opacity: 0
              }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              onClick={() => setSidebar(false)}
              className={`z-20 fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-900`}
            />
          )}
        </AnimatePresence>

        <div className="mt-14 pt-3">
          <Posts variables={getVariables(router.query)} />
        </div>

        <div className="fixed w-14 h-14 rounded-full bg-blue-500 shadow-md inline-flex right-4 bottom-20 z-10 cursor-pointer transition hover:bg-blue-600">
          <FiEdit size={20} className="m-auto" />
        </div>

        <div className="block sm:hidden items-center fixed z-10 justify-between text-tertiary bottom-0 left-0 right-0 h-14 bg-gray-800 shadow-md flex border-t dark:border-gray-700">
          <div className={bottomButton}>
            <FiHome size={20} className="m-auto text-blue-500" />
          </div>

          <div className={bottomButton}>
            <FiSearch size={20} className="m-auto" />
          </div>

          <div className={bottomButton}>
            <FiFolder size={20} className="m-auto" />
          </div>

          <div className={bottomButton}>
            <FiMail size={20} className="m-auto" />
          </div>
        </div>
      </Layout>
    </>
  )
}

const getVariables = query => {
  const sort =
    query.sort && query.sort.length >= 1 ? query.sort[0].toUpperCase() : 'HOT'
  const time =
    query.sort && query.sort.length >= 2 ? query.sort[1].toUpperCase() : 'ALL'
  return { sort, time, page: 0 }
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const variables = getVariables(ctx.query)

  await queryClient.prefetchQuery(['posts', variables], fetchPosts, {
    getNextPageParam: (lastPage, pages) => lastPage.nextPage
  })

  const dehydratedState = dehydrate(queryClient)
  for (const query of dehydratedState.queries) {
    if (query.state.fetchMeta === undefined) query.state.fetchMeta = null
  }

  return {
    props: {
      dehydratedState
    }
  }
}

function TopPlanets() {
  const { isLoading, isError, data, error } = usePlanets({
    sort: 'TOP',
    pageSize: 50
  })

  if (isLoading || isError) return null

  return (
    <div>
      {data.map(planet => (
        <NavLink
          className="flex items-center text-xs font-medium text-tertiary h-8"
          key={planet.id}
          href="/+[planet]"
          as={`/+${planet.name}`}
        >
          {planet.avatarURL ? (
            <Image
              width={20}
              height={20}
              src={planet.avatarURL}
              className="w-5 h-5 rounded-full"
              alt={planet.name}
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700" />
          )}

          <span className="ml-6">{planet.name}</span>
        </NavLink>
      ))}
    </div>
  )
}
