import { useRouter } from 'next/router'
import { QueryClient } from 'react-query'
import { fetchUser, useUser } from '@/lib/useUser'
import Image from 'next/image'
import { FiCalendar } from 'react-icons/fi'
import React from 'react'
import { dehydrate } from 'react-query/hydration'
import Posts from '@/components/post/Posts'
import UserAvatar from '@/components/user/UserAvatar'
import SortOptions from '@/components/SortOptions'
import SortOptionsUser from '@/components/SortOptionsUser'

const userInfoItem =
  'text-tertiary font-medium hover:text-blue-500 dark:hover:text-blue-500 transition cursor-pointer'

export default function UserPage() {
  const router = useRouter()
  const user = useUser({ username: router.query.username }).data

  return (
    <div>
      <div className="relative h-80 z-0">
        <div className="bg-gradient-to-br from-red-400 to-blue-500 absolute inset-0 opacity-90 z-0" />

        <div className="absolute inset-x-0 bottom-0 top-14 flex flex-col md:flex-row items-center md:items-end align-center z-20 mycontainer pt-6 md:pb-12">
          <div className="flex flex-grow">
            <UserAvatar className="w-40 h-40 mr-6" user={user} />

            <div className="flex flex-col w-full h-full items-center md:items-start justify-end">
              <div className="font-semibold uppercase tracking-widest text-xs text-secondary mb-2">
                User
              </div>

              <div className="text-7xl font-extrabold tracking-tight leading-none">
                {user.name}
              </div>

              <div className="font-medium text-secondary mt-4">{user.bio}</div>

              <div className="block md:hidden text-tertiary font-semibold uppercase tracking-widest text-xs text-right mt-4">
                {user.followerCount} Followers
              </div>

              <div className="h-9 rounded-full inline-flex w-32 items-center justify-center font-medium bg-blue-600 text-sm mt-8 cursor-pointer">
                Follow
              </div>
            </div>
          </div>

          <div className="hidden md:block mt-auto text-tertiary font-semibold uppercase tracking-widest text-xs text-right">
            <div>Followers</div>
            <div>{user.followerCount}</div>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-0 z-10 h-full bg-gradient-to-b from-transparent dark:to-gray-850" />

        {user.bannerUrl && (
          <Image
            src={user.bannerUrl}
            layout="fill"
            className="object-cover object-center"
          />
        )}
      </div>

      <div className="grid gap-6 grid-cols-3 mycontainer py-6">
        <div className="col-span-3 lg:col-span-2 relative">
          <SortOptionsUser />
          <Posts variables={getVariables(router.query)} />
        </div>

        <div className="col-span-0 lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded py-2.5 px-4">
            <div className="flex space-x-10">
              <div className={userInfoItem}>
                <div className="text-lg text-accent">{user.postCount}</div>
                <div className="text-xs">Posts</div>
              </div>

              <div className={userInfoItem}>
                <div className="text-lg text-accent">{user.followerCount}</div>
                <div className="text-xs">Followers</div>
              </div>

              <div className={userInfoItem}>
                <div className="text-lg text-accent">{user.followingCount}</div>
                <div className="text-xs">Following</div>
              </div>
            </div>
          </div>

          <div className="sticky top-14 pt-3">
            <div className="bg-white dark:bg-gray-900 rounded py-2.5 px-4">
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
