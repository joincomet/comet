import Layout from '@/components/Layout'
import GalaxiesSlider from '@/components/GalaxiesSlider'
import CreatePostCard from '@/components/CreatePostCard'
import Posts from '@/components/post/Posts'
import { QueryClient } from 'react-query'
import { fetchPosts } from '@/lib/usePosts'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Header from '@/components/Header'
import { withLayout } from '@moxy/next-layout'
import CreatePostFAB from '@/components/CreatePostFAB'
import { fetchCurrentUser } from '@/lib/useCurrentUser'
import { dehydrate } from '@/lib/dehydrate'
import Grass from '@/components/home/Grass'
import Telescope from '@/components/home/Telescope'
import { BiPlanet } from 'react-icons/bi'
import { useCopyToClipboard, usePrevious } from 'react-use'
import PermanentHeader from '@/components/PermanentHeader'
import Tippy from '@tippyjs/react'
import { FiCopy, FiUsers } from 'react-icons/fi'

function HomePage() {
  const router = useRouter()

  const [variables, setVariables] = useState(getVariables(router.query))
  const prevVariables = usePrevious(variables)

  return (
    <div>
      <div className="mycontainer">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 py-3">
            <div className="mb-3">
              <CreatePostCard />
            </div>
            <Posts variables={router.query.login ? prevVariables : variables} />
          </div>

          <div className="col-span-1">
            <div className="sticky top-14 pt-3">
              <ReferralsCard />
            </div>
          </div>
        </div>
      </div>

      <CreatePostFAB />
    </div>
  )
}

function ReferralsCard() {
  const [clipboardState, copyToClipboard] = useCopyToClipboard()

  const copyLink = `https://cometx.io/invite?from=dan`

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

export default withLayout()(HomePage)

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

  await queryClient.prefetchQuery(
    ['posts', variables],
    key => fetchPosts(key, ctx),
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage
    }
  )

  await queryClient.prefetchQuery(['currentUser'], () => fetchCurrentUser(ctx))

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      dehydratedState
    }
  }
}
