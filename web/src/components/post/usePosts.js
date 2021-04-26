import { useState } from 'react'
import { useStore } from '@/hooks/useStore'
import { usePostsQuery } from '@/graphql/hooks'

export const usePosts = ({ serverId, folderId }) => {
  const [postsSort, postsTime, folderSort] = useStore(s => [
    s.postsSort,
    s.postsTime,
    s.folderSort
  ])
  const [page, setPage] = useState(0)
  const variables = {
    sort: folderId ? folderSort : postsSort,
    time: postsSort === 'Top' && !folderId ? postsTime : null,
    serverId,
    folderId
  }
  const { data, loading, fetchMore } = usePostsQuery({
    variables,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first'
  })
  const hasMore = data?.posts.hasMore
  const posts = data?.posts.posts ?? []
  const loadMore = () => {
    if (!hasMore || posts.length === 0) return
    fetchMore({
      variables: {
        ...variables,
        offset: 20 * (page + 1)
      },
      updateQuery: (prev, { fetchMoreResult: res }) => {
        return {
          posts: {
            hasMore: res.posts.hasMore,
            posts: [...prev.posts.posts, ...res.posts.posts]
          }
        }
      }
    })
    setPage(page + 1)
  }
  return [posts, loading, loadMore, hasMore]
}
