import { QueryClient } from 'react-query'
import React, { useEffect, useState } from 'react'
import { dehydrate } from 'react-query/hydration'
import Posts from '@/components/post/Posts'
import SortOptions from '@/components/sort/SortOptions'
import InfoLinks from '@/components/InfoLinks'
import { useHeaderStore } from '@/lib/stores/useHeaderStore'
import { globalPrefetch } from '@/lib/queries/globalPrefetch'
import { useRouter } from 'next/router'
import usePostsVariables from '@/lib/usePostsVariables'

export default function SearchPage() {
  const { setTitle } = useHeaderStore()
  useEffect(() => setTitle('Search'), [])

  const { query, push } = useRouter()

  const [search, setSearch] = useState(query.q || '')

  return (
    <div>
      <div className="mycontainer mt-14 mb-28">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 md:col-span-2 py-6">
            <div className="px-3 md:px-0">
              <input
                className="w-full px-3 focus:outline-none dark:bg-gray-800 rounded h-12"
                placeholder="Search"
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !!search.trim())
                    push(`/search?q=${search}`, `/search?q=${search}`, {
                      shallow: true
                    })
                }}
              />
            </div>
            {query.q && (
              <>
                <div className="header-2 py-6 px-3 md:px-0">
                  Search: {query.q}
                </div>
                <SortOptions />
                <Posts variables={usePostsVariables()} />
              </>
            )}
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
