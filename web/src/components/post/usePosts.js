import { useState } from 'react'
import { useStore } from '@/hooks/useStore'
import { usePostsQuery } from '@/graphql/hooks'

export function usePosts({ serverId, folderId }) {
  const [postsSort, postsTime, folderSort] = useStore(s => [
    s.postsSort,
    s.postsTime,
    s.folderSort
  ])
  const [page, setPage] = useState(0)

  const { data, loading } = usePostsQuery({
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
    data?.posts.flatMap(res => res.posts),
    loading,
    () => setPage(page + 1),
    data && data.posts.length > 0
      ? data.posts[data.posts.length - 1].hasMore
      : false
  ]
}
