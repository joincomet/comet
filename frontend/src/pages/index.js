import { QueryClient } from 'react-query'
import React, { useState } from 'react'
import { fetchCurrentUser, useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useCopyToClipboard } from 'react-use'
import Tippy from '@tippyjs/react'
import { FiCopy, FiUsers } from 'react-icons/fi'
import { dehydrate } from 'react-query/hydration'
import Posts from '@/components/post/Posts'
import { fetchPosts } from '@/lib/queries/usePosts'
import SortOptions from '@/components/sort/SortOptions'
import NavLink from '@/components/NavLink'
import CreatePostButton from '@/components/createpost/CreatePostButton'
import { useLogin } from '@/lib/useLogin'
import InfoLinks from '@/components/InfoLinks'

export default function HomePage({ variables }) {
  const currentUser = useCurrentUser().data
  const { openLogin } = useLogin()

  return (
    <div>
      <CreatePostButton />

      <div className="mycontainer mt-14">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 md:col-span-2 py-6">
            {currentUser ? (
              <div className="mb-6 header-2 text-secondary px-3 md:px-0">
                Welcome back,{' '}
                <NavLink
                  href={`/user/${currentUser.username}`}
                  className="text-accent hover:underline cursor-pointer"
                >
                  {currentUser.username}
                </NavLink>
                .
              </div>
            ) : (
              <div className="mb-6 header-2 text-secondary px-3 md:px-0">
                <span
                  className="text-accent hover:underline cursor-pointer"
                  onClick={() => openLogin()}
                >
                  Log In or Sign Up
                </span>{' '}
                to customize your feed
              </div>
            )}

            <SortOptions />
            <Posts variables={variables} />
          </div>

          <div className="col-span-0 md:col-span-1 hidden md:block">
            <div className="sticky top-14 space-y-4 py-6">
              <ReferralsCard />

              <InfoLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReferralsCard() {
  const [clipboardState, copyToClipboard] = useCopyToClipboard()

  const currentUser = useCurrentUser().data

  const copyLink = `https://cometx.io/invite${
    currentUser ? `?from=${currentUser.username}` : ''
  }`

  const [copyTip, setCopyTip] = useState('Copy invite link')

  const copy = () => {
    copyToClipboard(copyLink)
    setCopyTip('Copied!')
    setTimeout(() => setCopyTip('Copy invite link'), 3000)
  }

  return (
    <div className="card p-3">
      <div className="font-medium text-primary inline-flex items-center">
        <FiUsers className="w-4 h-4 mr-3" />
        Invite Friends to CometX
      </div>
      <div className="mt-1 text-sm text-tertiary">
        Your profile displays the number of people you have invited
      </div>
      <Tippy content={copyTip}>
        <div
          onClick={() => copy()}
          className="mt-3 p-3 border dark:border-gray-800 rounded text-sm flex items-center text-accent cursor-pointer"
        >
          <span className="pr-3 truncate">{copyLink}</span>

          <div className="ml-auto">
            <FiCopy className="w-5 h-5 text-tertiary" />
          </div>
        </div>
      </Tippy>
    </div>
  )
}

const getVariables = query => {
  const sort = query.sort ? query.sort.toUpperCase() : 'HOT'
  let time = query.time ? query.time.toUpperCase() : 'ALL'
  if (sort === 'TOP' && !query.time) time = 'DAY'
  return { sort, time, joinedOnly: true }
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

  await queryClient.prefetchQuery(['currentUser'], () => fetchCurrentUser(ctx))

  const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)))

  return {
    props: {
      dehydratedState,
      variables
    }
  }
}
