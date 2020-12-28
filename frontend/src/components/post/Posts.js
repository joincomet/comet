import { usePosts } from '@/lib/queries/usePosts'
import Post from '@/components/post/Post'
import {
  List,
  WindowScroller,
  InfiniteLoader,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Posts({ variables }) {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = usePosts(
    variables
  )

  const posts = data ? data.pages.flatMap(page => page.posts) : []

  const rowCount = hasNextPage ? posts.length + 1 : posts.length

  const loadMoreRows = isFetchingNextPage ? () => {} : fetchNextPage

  const isRowLoaded = ({ index }) => !hasNextPage || index < posts.length

  const cache = new CellMeasurerCache({
    defaultHeight: 300,
    fixedWidth: true
  })

  const rowRenderer = ({ index, parent, style }) => {
    const post = posts[index]

    return (
      <CellMeasurer
        key={post ? post.id : 'loading'}
        cache={cache}
        columnIndex={0}
        parent={parent}
        rowIndex={index}
      >
        {({ measure, registerChild }) => (
          <div ref={registerChild} style={style}>
            {post ? (
              <Post
                post={post}
                index={index}
                measure={measure}
                className="lg:rounded-lg mb-3"
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        )}
      </CellMeasurer>
    )
  }

  const handleResize = event => {
    cache.clearAll()
  }

  const { query, pathname } = useRouter()

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => cache.clearAll(), [query, pathname])

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
      minimumBatchSize={1}
      threshold={5}
    >
      {({ onRowsRendered, registerChild }) => (
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <List
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              autoHeight={true}
              height={height || 1080}
              autoWidth
              width={10000}
              rowCount={rowCount}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
              rowHeight={cache.rowHeight}
              deferredMeasurementCache={cache}
              className="outline-none"
              containerStyle={{ position: 'static' }}
              style={{
                overflowX: 'hidden !important',
                overflowY: 'hidden !important',
                flexBasis: 'auto !important'
              }}
              rowRenderer={rowRenderer}
            />
          )}
        </WindowScroller>
      )}
    </InfiniteLoader>
  )
}
