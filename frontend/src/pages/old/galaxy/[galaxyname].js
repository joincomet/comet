import { QueryClient } from 'react-query'
import React, { useEffect } from 'react'
import { dehydrate } from 'react-query/hydration'
import Posts from '@/components/post/Posts'
import SortOptions from '@/components/sort/SortOptions'
import CreatePostButton from '@/components/post/create/CreatePostButton'
import InfoLinks from '@/components/InfoLinks'
import { useHeaderStore } from '@/lib/stores/useHeaderStore'
import { globalPrefetch } from '@/lib/queries/globalPrefetch'
import { useRouter } from 'next/router'
import usePostsVariables from '@/lib/usePostsVariables'
import { galaxiesMap } from '@/lib/galaxiesMap'

export default function GalaxyPage() {
  const { query } = useRouter()
  const { setTitle } = useHeaderStore()
  useEffect(() => setTitle(galaxiesMap[query.galaxyname]), [])

  return (
    <div>
      <CreatePostButton />

      <div className="mycontainer mt-14 mb-28">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 md:col-span-2 py-6">
            <div className="header-2 mb-6 px-3 md:px-0">
              {galaxiesMap[query.galaxyname]}
            </div>
            <SortOptions />
            <Posts variables={usePostsVariables()} />
          </div>

          <div className="col-span-0 md:col-span-1 hidden md:block">
            <div className="sticky top-14 space-y-4 py-6">
              <InfoLinks />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  await globalPrefetch(queryClient, ctx)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
