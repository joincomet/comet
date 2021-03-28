import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Scroller from '@/components/Scroller'
import Post from '@/components/post/Post'
import { useQuery } from 'urql'
import { GET_POSTS } from '@/graphql/queries'
import { useStore } from '@/lib/stores/useStore'
import { IconSpinner } from '@/lib/Icons'
import { useVirtual } from 'react-virtual'

export default function Posts({ variables, showServerName }) {
  const { postsSort, postsTime } = useStore()

  const [page, setPage] = useState(0)

  const [{ data, fetching }] = useQuery({
    query: GET_POSTS,
    variables: {
      pageSize: 20,
      page,
      sort: postsSort,
      time: postsTime,
      ...variables
    }
  })
  const canFetchMore = true

  const posts = data?.getPosts ?? []

  const parentRef = useRef()

  const rowVirtualizer = useVirtual({
    size: canFetchMore ? posts.length + 1 : posts.length,
    parentRef,
    estimateSize: useCallback(() => 100, []),
    keyExtractor: useCallback(
      index => (index < posts.length ? posts[index].id : 'loader'),
      [posts]
    ),
    overscan: 1
  })

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.virtualItems].reverse()

    if (!lastItem) {
      return
    }

    if (lastItem.index === posts.length - 1 && canFetchMore && !fetching) {
      setPage(page + 1)
    }
  }, [canFetchMore, posts.length, fetching, rowVirtualizer.virtualItems])

  return (
    <div
      ref={parentRef}
      style={{
        height: `100%`,
        width: `100%`,
        overflow: 'auto'
      }}
      className="scrollbar dark:bg-gray-750"
    >
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
                <Post
                  post={post}
                  showServerName={showServerName}
                  measure={rowVirtualizer.measure}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
