import { useRouter } from 'next/router'
import { withLayout } from '@moxy/next-layout'
import { QueryClient } from 'react-query'
import { fetchPosts } from '@/lib/usePosts'
import { fetchUser, useUser } from '@/lib/useUser'
import Image from 'next/image'
import { FiUser, FiCalendar } from 'react-icons/fi'
import React from 'react'
import PostsVirtualized from '@/components/post/PostsVirtualized'
import { dehydrate } from 'react-query/hydration'
import Posts from '@/components/post/Posts'

const userInfoItem =
  'text-tertiary font-medium hover:text-blue-500 dark:hover:text-blue-500 transition cursor-pointer'

export default function UserPage() {
  const router = useRouter()
  const user = useUser({ username: router.query.username }).data

  return (
    <div>
      <div className="pb-3">
        <div className="bg-white dark:bg-gray-800 shadow relative">
          <div className="w-full h-32 relative">
            {user.bannerUrl ? (
              <Image
                src={user.bannerUrl}
                layout="fill"
                className="object-cover object-center"
              />
            ) : (
              <div className="bg-gradient-to-tr from-red-400 to-blue-500 w-full h-full" />
            )}
          </div>

          <div className="mycontainer">
            <div className="relative">
              <div
                className={`w-24 h-24 lg:w-32 lg:h-32 absolute left-0 top-0 transform -translate-y-1/2 inline-flex rounded-full ring-4 ring-white dark:ring-gray-800 ${
                  user.avatarUrl ? '' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    layout="fill"
                    className="rounded-full object-cover object-center"
                  />
                ) : (
                  <FiUser className="m-auto w-1/2 h-1/2 text-tertiary" />
                )}
              </div>
            </div>

            <div className="ml-24 lg:ml-32 p-3 flex">
              <div>
                <div className="font-semibold text-xl leading-none">
                  {user.name}
                </div>

                <div className="text-tertiary font-normal text-sm mt-1">
                  @{user.username}
                </div>
              </div>

              <div className="ml-auto text-white transition bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-full px-6 h-9 font-medium text-sm inline-flex items-center">
                Follow
              </div>
            </div>

            <div className="flex pt-3">
              <div className="inline-flex items-center border-b-2 text-blue-500 border-blue-500 px-6 h-10 cursor-pointer select-none text-sm font-medium transition dark:hover:bg-gray-700 rounded-t-md">
                Overview
              </div>
              <div className="inline-flex items-center text-tertiary px-6 h-10 cursor-pointer select-none text-sm font-medium transition dark:hover:bg-gray-700 rounded-t-md">
                Posts
              </div>
              <div className="inline-flex items-center text-tertiary px-6 h-10 cursor-pointer select-none text-sm font-medium transition dark:hover:bg-gray-700 rounded-t-md">
                Comments
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:grid gap-3 grid-cols-3 mycontainer-nopad">
        <div className="col-span-2 relative">
          <Posts variables={getVariables(router.query)} />
        </div>

        <div className="col-span-1">
          <div className="bg-white dark:bg-gray-800 lg:rounded-lg border border-gray-200 dark:border-gray-800 py-2.5 px-4">
            <div className="flex space-x-10">
              <div className={userInfoItem}>
                <div className="text-lg text-accent">{user.postCount || 0}</div>
                <div className="text-xs">Posts</div>
              </div>

              <div className={userInfoItem}>
                <div className="text-lg text-accent">
                  {user.followerCount || 0}
                </div>
                <div className="text-xs">Followers</div>
              </div>

              <div className={userInfoItem}>
                <div className="text-lg text-accent">
                  {user.followingCount || 0}
                </div>
                <div className="text-xs">Following</div>
              </div>
            </div>
          </div>

          <div className="sticky top-14 pt-3">
            <div className="bg-white dark:bg-gray-800 lg:rounded-lg border border-gray-200 dark:border-gray-800 py-2.5 px-4">
              <div className="text-lg font-medium">About</div>
              <div className="text-sm mt-3">{user.bio}</div>
              <div className="border-t dark:border-gray-700 flex items-center text-tertiary text-xs pt-3 mt-3">
                <FiCalendar className="w-4 h-4 mr-3" />
                Joined {user.timeSinceCreated}
              </div>
              <div className="border-t dark:border-gray-700 flex items-center text-tertiary text-sm pt-3 mt-3">
                Website
                <div className="ml-auto hover:underline text-accent cursor-pointer">
                  cometx.io
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 lg:rounded-lg border border-gray-200 dark:border-gray-800 py-2.5 px-4 mt-3">
              Media
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getVariables = query => {
  const sort =
    query.sort && query.sort.length >= 1 ? query.sort[0].toUpperCase() : 'HOT'
  const time =
    query.sort && query.sort.length >= 2 ? query.sort[1].toUpperCase() : 'ALL'
  return { sort, time, username: query.username }
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  /*const variables = getVariables(ctx.query)

  await queryClient.prefetchQuery(
    ['posts', variables],
    key => fetchPosts(key, ctx),
    {
      infinite: true,
      getNextPageParam: (lastPage, pages) => lastPage.nextPage
    }
  )*/

  await queryClient.prefetchQuery(
    ['user', { username: ctx.query.username }],
    key => fetchUser(key, ctx)
  )

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      dehydratedState
    }
  }
}
