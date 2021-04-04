import { useCallback, useEffect, useRef } from 'react'
import Post from '@/components/post/Post'
import { IconSpinner } from '@/components/ui/icons/Icons'
import { useVirtual } from 'react-virtual'
import CreatePostCard from '@/components/post/CreatePostCard'
import { usePosts } from '@/components/post/usePosts'
import PostContextMenuWrapper from '@/components/post/PostContextMenuWrapper'

export default function Posts({ serverId, folderId, showServerName }) {
  const [posts, fetching, fetchMore, hasMore] = usePosts({ serverId, folderId })

  const parentRef = useRef()

  const rowVirtualizer = useVirtual({
    size: hasMore ? posts.length + 1 : posts.length,
    parentRef,
    estimateSize: useCallback(() => 100, []),
    keyExtractor: useCallback(
      index => (index < posts.length ? posts[index].id : 'loader'),
      [posts]
    ),
    overscan: 5
  })

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.virtualItems].reverse()

    if (!lastItem) {
      return
    }

    if (lastItem.index === posts.length - 1 && hasMore && !fetching) {
      fetchMore()
    }
  }, [hasMore, posts.length, fetching, rowVirtualizer.virtualItems])

  return (
    <>
      <PostContextMenuWrapper />

      <div
        ref={parentRef}
        style={{
          height: `100%`,
          width: `100%`,
          overflow: 'auto'
        }}
        className="scrollbar dark:bg-gray-750"
      >
        <div className="py-4 px-4">
          <CreatePostCard />
        </div>

        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`
          }}
          className="relative w-full"
        >
          {rowVirtualizer.virtualItems.map(virtualRow => {
            const isLoaderRow = virtualRow.index > posts.length - 1
            const post = posts[virtualRow.index]

            return (
              <div
                key={virtualRow.index}
                ref={el => virtualRow.measureRef(el)}
                className="absolute top-0 left-0 w-full h-auto"
                style={{
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                {isLoaderRow ? (
                  <div className="flex items-center justify-center h-20">
                    <IconSpinner />
                  </div>
                ) : (
                  <div className="px-4 pb-1">
                    <Post
                      post={post}
                      showServerName={showServerName}
                      measure={rowVirtualizer.measure}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
