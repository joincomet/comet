import { useState } from 'react'
import { usePostsQuery } from '@/graphql/queries'
import { useStore } from '@/hooks/useStore'

export function usePosts({ serverId, folderId }) {
  const [postsSort, postsTime] = useStore(s => [s.postsSort, s.postsTime])
  const [page, setPage] = useState(0)

  const [{ data, fetching }] = usePostsQuery({
    pageSize: 20,
    page,
    sort: postsSort,
    time: postsTime,
    serverId,
    folderId
  })

  return [data?.getPosts ?? [], fetching, () => setPage(page + 1)]
}
