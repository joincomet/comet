import { useState } from 'react'
import { GET_POSTS } from '@/graphql/queries'
import { useStore } from '@/hooks/useStore'
import { useQuery } from 'urql'

export function usePosts({ serverId, folderId }) {
  const [postsSort, postsTime, folderSort] = useStore(s => [
    s.postsSort,
    s.postsTime,
    s.folderSort
  ])
  const [page, setPage] = useState(0)

  const [{ data, fetching }] = useQuery({
    query: GET_POSTS,
    variables: {
      pageSize: 20,
      page,
      sort: folderId ? folderSort : postsSort,
      time: folderId ? null : postsTime,
      serverId,
      folderId
    }
  })

  return [
    data?.getPosts.flatMap(res => res.posts),
    fetching,
    () => setPage(page + 1),
    data && data.getPosts.length > 0
      ? data.getPosts[data.getPosts.length - 1].hasMore
      : true
  ]
}
