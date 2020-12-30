import { usePosts } from '@/lib/queries/usePosts'
import Post from '@/components/post/Post'
import { useCallback, useEffect, useRef } from 'react'
import { useVirtualWindow } from '@/lib/virtual'
import Spinner from '@/components/Spinner'

export default function Posts({ variables }) {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage
  } = usePosts(variables)

  const posts = data ? data.pages.flatMap(page => page.posts) : []

  if (typeof window === 'undefined') return null

  const parentRef = useRef()
  const windowRef = useRef(window)

  const rowVirtualizer = useVirtualWindow({
    size: hasNextPage ? posts.length + 1 : posts.length,
    parentRef,
    estimateSize: useCallback(() => 200, []),
    overscan: 5,
    windowRef
  })

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.virtualItems].reverse()

    if (!lastItem) {
      return
    }

    if (
      lastItem.index >= posts.length - 5 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    hasNextPage,
    fetchNextPage,
    posts.length,
    isFetchingNextPage,
    rowVirtualizer.virtualItems
  ])

  const loader = (
    <div className="w-full flex items-center justify-center py-3">
      <Spinner />
    </div>
  )

  return (
    <div ref={parentRef}>
      <div
        className="w-full relative"
        style={{
          height: `${rowVirtualizer.totalSize}px`
        }}
      >
        {rowVirtualizer.virtualItems.map(virtualRow => {
          const isLoaderRow = virtualRow.index >= posts.length
          const post = posts[virtualRow.index]

          return (
            <div
              key={virtualRow.index}
              ref={virtualRow.measureRef}
              className="absolute top-0 left-0 w-full h-auto"
              style={{
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              {isLoaderRow ? hasNextPage && loader : <Post post={post} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
