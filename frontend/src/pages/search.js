import { QueryClient } from 'react-query'
import React, { useEffect, useState } from 'react'
import { dehydrate } from 'react-query/hydration'
import Posts from '@/components/post/Posts'
import SortOptions from '@/components/sort/SortOptions'
import InfoLinks from '@/components/InfoLinks'
import { useHeaderStore } from '@/lib/stores/useHeaderStore'
import { globalPrefetch } from '@/lib/queries/globalPrefetch'
import { useRouter } from 'next/router'

export default function SearchPage() {
  const { setTitle } = useHeaderStore()
  useEffect(() => setTitle('Search'), [])

  const { query, pathname, push } = useRouter()

  const [search, setSearch] = useState(query.q || '')

  return (
    <div>
      {/*<CreatePostButton />*/}

      <div className="mycontainer mt-14 mb-28">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 md:col-span-2 py-6">
            <input
              className="w-full px-3 focus:outline-none dark:bg-gray-800 rounded h-12"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') push(`/search?q=${search}`)
              }}
            />
            <div className="header-2 py-6">Search: {query.q}</div>
            <SortOptions />
            <Posts variables={getVariables(query)} />
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

const getVariables = query => {
  const sort = query.sort ? query.sort.toUpperCase() : 'HOT'
  let time = query.time ? query.time.toUpperCase() : 'ALL'
  if (sort === 'TOP' && !query.time) time = 'DAY'
  return {
    sort,
    time,
    joinedOnly: false,
    q: query.q || '',
    page: query.page ? parseInt(query.page) : 0
  }
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
