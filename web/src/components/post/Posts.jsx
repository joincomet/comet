import { Virtuoso } from 'react-virtuoso'
import { usePosts } from '@/components/post/usePosts'
import CreatePostHeader from '@/components/post/CreatePostHeader'
import Post from '@/components/post/Post'
import { IconSpinner } from '@/components/ui/icons/IconSpinner'
import { useCallback, useRef } from 'react'

export default function Posts({ folderId, serverId, showServerName, header }) {
  const virtuoso = useRef(null)

  const [posts, fetching, fetchMore, hasMore] = usePosts({ folderId, serverId })

  const postRenderer = useCallback(
    (postsList, index) => {
      const post = postsList[index]
      if (!post) return <div style={{ height: '1px' }} /> // returning null or zero height breaks the virtuoso
      return (
        <div className="px-4 pb-1">
          <Post post={post} showServerName={showServerName} />
        </div>
      )
    },
    [showServerName]
  )

  return (
    <>
      <Virtuoso
        className="scrollbar dark:bg-gray-750"
        components={{
          Header: header ? () => header : null,
          Footer: () =>
            hasMore ? (
              <div className="flex items-center justify-center h-20">
                <IconSpinner />
              </div>
            ) : null
        }}
        endReached={() => {
          if (!fetching && hasMore) {
            fetchMore()
          }
        }}
        itemContent={i => postRenderer(posts, i)}
        overscan={100}
        ref={virtuoso}
        style={{ overflowX: 'hidden' }}
        totalCount={posts?.length || 0}
      />
    </>
  )
}
