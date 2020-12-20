import { useRouter } from 'next/router'
import { QueryClient } from 'react-query'
import { fetchUser, useUser } from '@/lib/queries/useUser'
import Image from 'next/image'
import { FiCalendar } from 'react-icons/fi'
import React, { useEffect } from 'react'
import { dehydrate } from 'react-query/hydration'
import Posts from '@/components/post/Posts'
import UserAvatar from '@/components/user/UserAvatar'
import SortOptionsUser from '@/components/sort/SortOptionsUser'
import { fetchPosts } from '@/lib/queries/usePosts'
import { fetchComments } from '@/lib/queries/useComments'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import CreatePostButton from '@/components/createpost/CreatePostButton'
import UserFollowButton from '@/components/user/UserFollowButton'
import UserHeader from '@/components/user/UserHeader'
import { useInView } from 'react-intersection-observer'
import { useHeaderStore } from '@/lib/stores'

const userInfoItem =
  'text-tertiary font-medium hover:text-blue-500 dark:hover:text-blue-500 transition cursor-pointer'

export default function UserPage({ variables }) {
  const router = useRouter()
  const user = useUser({ username: router.query.username }).data
  const currentUser = useCurrentUser().data
  const { ref, inView } = useInView({ threshold: 0.8 })
  const { setDark } = useHeaderStore()
  useEffect(() => setDark(!inView), [inView])

  return (
    <div>
      {currentUser && user.id === currentUser.id && <CreatePostButton />}

      <UserHeader user={user} show={!inView} />

      <div className="relative h-80 z-0">
        <div className="bg-gradient-to-br from-red-400 to-blue-500 absolute inset-0 opacity-90 z-0" />

        <div className="absolute inset-x-0 bottom-0 top-14 flex flex-col md:flex-row items-center md:items-end align-center z-20 mycontainer pt-3 md:pt-6 md:pb-12">
          <div className="flex flex-col items-center md:items-start md:flex-row flex-grow">
            <div className="label block md:hidden mb-4">User</div>

            <UserAvatar
              className="w-20 h-20 md:w-40 md:h-40 shadow-md md:mr-6"
              user={user}
            />

            <div className="flex flex-col w-full md:h-full items-center md:items-start justify-end space-y-4">
              <div className="label hidden md:block">User</div>

              <div className="header-1" ref={ref}>
                {user.name}
              </div>

              <div className="block md:hidden text-tertiary label text-right">
                {user.followerCount} Followers
              </div>

              <UserFollowButton user={user} />
            </div>
          </div>

          <div className="hidden md:flex mt-auto space-x-6">
            <div className="text-tertiary transition dark:hover:text-blue-500 hover:text-blue-500 cursor-pointer label text-right">
              <div>Followers</div>
              <div>{user.followerCount}</div>
            </div>

            <div className="text-tertiary transition dark:hover:text-blue-500 hover:text-blue-500 cursor-pointer label text-right">
              <div>Following</div>
              <div>{user.followingCount}</div>
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-0 z-10 h-full bg-gradient-to-b from-transparent dark:to-gray-850" />

        {user.bannerUrl && (
          <Image
            src={user.bannerUrl}
            layout="fill"
            objectFit="cover"
            className="select-none"
          />
        )}
      </div>

      <div className="grid gap-6 grid-cols-3 mycontainer py-6">
        <div className="col-span-3 lg:col-span-2 relative">
          <div className="px-3 md:px-0">
            <SortOptionsUser user={user} />
          </div>
          <Posts variables={variables} />
        </div>

        <div className="col-span-0 lg:col-span-1">
          <div>
            <div className="text-xl font-bold tracking-tight leading-none mb-6 text-secondary">
              About
            </div>
            <div className="text-sm text-secondary font-medium">
              {user.bio || 'New CometX User'}
            </div>

            <div className="mt-4 text-tertiary text-xs font-medium inline-flex items-center">
              <FiCalendar size={16} className="mr-3" />
              Joined {user.timeSinceCreated}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getVariables = query => {
  const sort = query.sort ? query.sort.toUpperCase() : 'NEW'
  const time = query.time ? query.time.toUpperCase() : 'ALL'
  return { sort, time, username: query.username }
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const { query } = ctx

  const variables = getVariables(query)

  await queryClient.prefetchInfiniteQuery(
    ['posts', variables],
    key => fetchPosts(key, ctx),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage
    }
  )

  await queryClient.prefetchQuery(['comments', variables], key =>
    fetchComments(key, ctx)
  )

  await queryClient.prefetchQuery(['user', { username: query.username }], key =>
    fetchUser(key, ctx)
  )

  const dehydratedState = dehydrate(queryClient)
  dehydratedState.queries[0].state.data.pageParams = [0]

  return {
    props: {
      dehydratedState,
      variables
    }
  }
}
