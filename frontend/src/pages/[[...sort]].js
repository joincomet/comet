import CreatePostCard from '@/components/CreatePostCard'
import PostsVirtualized from '@/components/post/PostsVirtualized'
import { QueryClient } from 'react-query'
import { fetchPosts } from '@/lib/usePosts'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { withLayout } from '@moxy/next-layout'
import CreatePostFAB from '@/components/CreatePostFAB'
import { fetchCurrentUser, useCurrentUser } from '@/lib/useCurrentUser'
import { useCopyToClipboard, usePrevious } from 'react-use'
import Tippy from '@tippyjs/react'
import { FiCopy, FiUsers } from 'react-icons/fi'
import { dehydrate } from 'react-query/hydration'
import { RiFireLine } from 'react-icons/ri'
import Posts from '@/components/post/Posts'

export default function HomePage() {
  const router = useRouter()

  const [variables, setVariables] = useState(getVariables(router.query))
  const prevVariables = usePrevious(variables)

  return (
    <div>
      <div className="mycontainer">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 py-3">
            <div className="">
              <CreatePostCard />
            </div>
            <div className="my-6 flex items-center">
              <div className="inline-flex items-center ml-auto bg-gray-800 rounded-full pl-6">
                <RiFireLine className="w-4 h-4 mr-1" />
                <select
                  name="sort"
                  id="sort"
                  className="h-9 border-none text-sm bg-gray-800 rounded-r-full focus:ring-0"
                  defaultValue="Hot"
                >
                  <option value="Hot">Hot</option>
                  <option value="New">New</option>
                  <option value="Top">Top</option>
                  <option value="Rising">Rising</option>
                </select>
              </div>
            </div>
            <Posts variables={router.query.login ? prevVariables : variables} />
          </div>

          <div className="col-span-1">
            <div className="sticky top-14 pt-3 space-y-3">
              <ReferralsCard />

              <InfoCard />
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
    setCopyTip('Copied invite link!')
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
          className="mt-3 p-3 dark:bg-gray-900 rounded text-sm flex items-center text-accent cursor-pointer"
        >
          {copyLink}

          <div className="ml-auto">
            <FiCopy className="w-5 h-5 text-tertiary" />
          </div>
        </div>
      </Tippy>
    </div>
  )
}

function InfoCard() {
  const link =
    'text-xs font-medium text-tertiary hover:underline cursor-pointer'
  return (
    <>
      <style jsx>
        {`
          a {
            display: block;
          }
        `}
      </style>

      <div className="py-3">
        <div className="flex divide-x divide-gray-800">
          <div className="space-y-1 flex-grow px-3">
            <a className={link}>Discord</a>
            <a className={link}>Patreon</a>
            <a className={link}>GitHub</a>
            <a className={link}>Twitter</a>
          </div>

          <div className="space-y-1 flex-grow px-3">
            <a className={link}>About</a>
            <a className={link}>Terms of Service</a>
            <a className={link}>Privacy Policy</a>
            <a className={link}>Content Policy</a>
          </div>
        </div>
      </div>
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

  /*const variables = getVariables(ctx.query)

  await queryClient.prefetchQuery(
    ['posts', variables],
    key => fetchPosts(key, ctx),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage
    }
  )*/

  await queryClient.prefetchQuery(['currentUser'], () => fetchCurrentUser(ctx))

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      dehydratedState
    }
  }
}
