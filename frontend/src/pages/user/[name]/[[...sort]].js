import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { withLayout } from '@moxy/next-layout'
import { QueryClient } from 'react-query'
import { fetchPosts } from '@/lib/usePosts'
import { fetchPlanet } from '@/lib/usePlanet'
import { dehydrate } from '@/lib/dehydrate'
import { fetchUser, useUser } from '@/lib/useUser'
import Image from 'next/image'
import {
  FiUser,
  FiPlus,
  FiMapPin,
  FiCalendar,
  FiGlobe,
  FiBook,
  FiFolder,
  FiMessageCircle,
  FiImage,
  FiArchive
} from 'react-icons/fi'
import NavLink from '@/components/NavLink'
import React from 'react'
import Posts from '@/components/post/Posts'
import { BiPlanet } from 'react-icons/bi'
import PermanentHeader from '@/components/PermanentHeader'

const tab =
  'transform hover:bg-blue-500 dark:hover:bg-blue-500 rounded-full hover:-translate-y-0.5 bg-white dark:bg-gray-900 hover:text-white dark:hover:text-white transition px-6 h-9 inline-flex items-center text-sm select-none cursor-pointer'

const selectedTab = 'text-blue-500 font-semibold'
const unselectedTab = 'text-gray-600 dark:text-gray-400'

function UserPage() {
  const router = useRouter()
  const user = useUser({ username: router.query.name }).data

  return (
    <div>
      <PermanentHeader />
      <div className="mx-3 2xl:mx-64 pt-6 pb-3">
        <div className="glow rounded-2xl bg-white dark:bg-gray-800 relative">
          <div className="w-full h-32 relative">
            <Image
              src="https://media.cometx.io/trump_banner.jpg"
              layout="fill"
              className="object-cover object-center rounded-t-2xl"
            />
          </div>

          <div
            className={`w-32 h-32 absolute left-3 top-32 transform -translate-y-1/2 inline-flex rounded-full shadow-md ${
              user.avatarUrl ? '' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <Image
              src="https://media.cometx.io/trump_avatar.jpg"
              layout="fill"
              className="rounded-full object-cover object-center"
            />
          </div>

          <div className="ml-36">
            <div className="p-3 flex">
              <div className="space-y-2">
                <div className="font-semibold leading-none">
                  Donald J. Trump&nbsp;
                  <span className="text-tertiary font-normal">
                    @realDonaldTrump
                  </span>
                </div>

                <div className="prose-sm text-secondary">
                  45th President of the United States of America
                </div>

                <div className="flex items-center text-tertiary text-sm">
                  <FiMapPin className="w-4 h-4 mr-1.5" />
                  Washington, DC
                  <FiGlobe className="w-4 h-4 ml-3 mr-1.5" />
                  <span className="text-blue-500 hover:underline">
                    Vote.DonaldJTrump.com
                  </span>
                  <FiCalendar className="w-4 h-4 ml-3 mr-1.5" />
                  Joined {user.timeSinceCreated}
                </div>

                <div className="flex items-center space-x-3 text-tertiary text-sm">
                  <div className="hover:underline cursor-pointer">
                    <span className="font-semibold text-secondary">51</span>{' '}
                    Following
                  </div>
                  <div className="hover:underline cursor-pointer">
                    <span className="font-semibold text-secondary">88.6M</span>{' '}
                    Followers
                  </div>

                  <div className="font-bold">&middot;</div>
                  <div className="hover:underline cursor-pointer">
                    <span className="font-semibold text-secondary">20</span>{' '}
                    Planets
                  </div>
                </div>
              </div>

              <div className="ml-auto text-white transition bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-full px-6 h-9 font-medium text-sm inline-flex items-center">
                Follow
              </div>

              {/*<div className="ml-auto transition bg-blue-500 hover:bg-red-500 cursor-pointer rounded-full px-6 h-9 font-medium text-sm inline-flex items-center">
              Following
            </div>*/}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3 2xl:mx-40 flex items-center">
        <div className="w-48 h-0.5 bg-gray-700 glow transform -translate-y-1/2" />
        <div className="inline-flex space-x-3 mx-auto">
          <div className={`${tab} ${selectedTab}`}>
            <FiArchive size={20} className="mr-3" />
            Posts
          </div>
          <div className={`${tab} ${unselectedTab}`}>
            <FiMessageCircle size={20} className="mr-3" />
            Comments
          </div>
          <div className={`${tab} ${unselectedTab}`}>
            <FiFolder size={20} className="mr-3" />
            Folders
          </div>
          <div className={`${tab} ${unselectedTab}`}>
            <FiImage size={20} className="mr-3" />
            Media
          </div>
        </div>
        <div className="w-48 h-0.5 bg-gray-700 glow transform -translate-y-1/2" />
      </div>

      <div>
        <Posts variables={getVariables(router.query)} />
      </div>
    </div>
  )
}

export default withLayout()(UserPage)

const getVariables = query => {
  const sort =
    query.sort && query.sort.length >= 1 ? query.sort[0].toUpperCase() : 'HOT'
  const time =
    query.sort && query.sort.length >= 2 ? query.sort[1].toUpperCase() : 'ALL'
  return { sort, time, username: query.name }
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const variables = getVariables(ctx.query)

  await queryClient.prefetchQuery(
    ['posts', variables],
    key => fetchPosts(key, ctx),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage
    }
  )

  await queryClient.prefetchQuery(['user', { username: ctx.query.name }], key =>
    fetchUser(key, ctx)
  )

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      dehydratedState
    }
  }
}
