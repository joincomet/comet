import { Virtuoso } from 'react-virtuoso'
import { usePosts } from '@/components/post/usePosts'
import Post from '@/components/post/Post'
import { IconSpinner } from '@/components/ui/icons/IconSpinner'
import { useCallback, useRef } from 'react'
import EndReached from '@/components/ui/EndReached'

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
    return (
      <div className="md:px-4 pb-1.5 px-0">
        <div className="relative group dark:bg-gray-800 bg-gray-200 md:rounded">
          <div className="animate-pulse relative group dark:bg-gray-800  bg-gray-200 px-2 py-3 md:rounded flex ">
            <div className="flex flex-col items-center pr-2 w-9">
              <div className="w-5 h-full rounded dark:bg-gray-750 bg-gray-300"></div>
            </div>
            <div className="w-26 min-w-[6.5rem] h-18 min-h-[4.5rem] rounded dark:bg-gray-750 bg-gray-300 mr-4 flex justify-center bg-center bg-cover bg-no-repeat"></div>
            <div className="pr-4 flex-grow flex flex-col">
              <div className="w-full flex-1 bg-gray-300 dark:bg-gray-750 rounded mb-1.5"></div>
              <div className="w-full flex-1 bg-gray-300 dark:bg-gray-750 rounded"></div>
              <div className="w-full flex-1 bg-gray-300 dark:bg-gray-750 select-nonedark:bg-gray-750 rounded mt-1.5"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Virtuoso
        className={`scrollbar-custom dark:bg-gray-750 bg-gray-100`}
        components={{
          Header: header ? fetching ? () => <div className="p-4">
          <div
            className="dark:bg-gray-700 h-13 flex items-center rounded transition dark:hover:bg-gray-650 cursor-pointer bg-gray-200 hover:bg-gray-300 animate-pulse"
          >
          </div>
        </div> : () => header : null,
          Footer: () =>
            hasMore ? (
              <div className="flex items-center justify-center h-20">
                <IconSpinner />
              </div>
            ) : !fetching ? (
              <EndReached />
            ) : null
        }}
        endReached={() => {
          if (!fetching && hasMore) {
            fetchMore()
          }
        }}
        itemContent={i =>
          !fetching ? postRenderer(posts, i) : skeletonPostsRenderer()
        }
        overscan={100}
        ref={virtuoso}
        style={{ overflowX: 'hidden' }, {overflowY: fetching ? "hidden" : null}}
        totalCount={!fetching ? posts?.length || 0 : NUMBER_OF_SKELETON_POSTS}
      />
    </>
  )
}
