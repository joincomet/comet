import { Virtuoso } from 'react-virtuoso'
import { usePosts } from '@/components/post/usePosts'
import Post from '@/components/post/Post'
import { IconSpinner } from '@/components/ui/icons/IconSpinner'
import { useCallback, useRef } from 'react'
import EndReached from '@/components/ui/EndReached'
import {
  SkeletonPostLoader
} from '@/components/loaders/SkeletonLoaders'

const NUMBER_OF_SKELETON_POSTS = 7

export default function Posts({ folderId, serverId, showServerName, header }) {
  const virtuoso = useRef(null)

  const [posts, fetching, fetchMore, hasMore] = usePosts({ folderId, serverId })

  const postRenderer = useCallback(
    (postsList, index) => {
      const post = postsList[index]
      if (!post) return <div style={{ height: '1px' }} /> // returning null or zero height breaks the virtuoso
      return (
        <div className="md:px-4 pb-1.5 px-0">
          <Post post={post} showServerName={showServerName} index={index} />
        </div>
      )
    },
    [showServerName]
  )

  const skeletonPostsRenderer = () => {
    return <SkeletonPostLoader />
  }

  return (
    <>
      {!!posts && !fetching ? (
        <Virtuoso
          key={0}
          className={`scrollbar-custom dark:bg-gray-750 bg-gray-100`}
          components={{
            Header: header ? () => header : null,
            Footer: () =>
              hasMore ? (
                <div className="flex items-center justify-center h-20">
                  <IconSpinner />
                </div>
              ) : (
                <EndReached />
              )
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
      ) : (
        <Virtuoso
          key={1}
          className={`scrollbar-custom dark:bg-gray-750 bg-gray-100`}
          components={{
            Header: () => (
              <div className="p-4">
                <div className="dark:bg-gray-700 h-13 flex items-center rounded bg-gray-200 animate-pulse"></div>
              </div>
            )
          }}
          itemContent={skeletonPostsRenderer}
          overscan={100}
          ref={virtuoso}
          style={{ overflowX: 'hidden' }}
          totalCount={NUMBER_OF_SKELETON_POSTS}
        />
      )}
    </>
  )
}
