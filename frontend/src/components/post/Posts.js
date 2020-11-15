import 'react-virtualized/styles.css'
import React, { useEffect } from 'react'
import Post from '@/components/post/Post'
import {
  CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader,
  List,
  WindowScroller
} from 'react-virtualized'
import { usePosts } from '@/components/post/usePosts'

export default function Posts({ variables, layout }) {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  } = usePosts(variables)

  useEffect(() => {
    cache.clearAll()
  }, [layout, variables])

  const handleResize = event => {
    cache.clearAll()
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  if (!data) return null

  const posts = () => data.map(page => page.posts).flat()

  return (
    <InfiniteLoader
      isRowLoaded={index => posts().length > index}
      loadMoreRows={() => fetchMore()}
      rowCount={posts().length}
      minimumBatchSize={1}
      layout={layout}
      threshold={5}
    >
      {({ onRowsRendered, registerChild }) => (
        <WindowScroller layout={layout}>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <List
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              overscanRowCount={10}
              autoHeight={true}
              height={height || 1080}
              autoWidth
              width={10000}
              rowCount={posts().length}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
              rowHeight={cache.rowHeight}
              deferredMeasurementCache={cache}
              className="virtual-list outline-none"
              style={{ overflowX: 'hidden !important' }}
              rowRenderer={getRowRender(posts(), layout)}
              layout={layout}
            />
          )}
        </WindowScroller>
      )}
    </InfiniteLoader>
  )
}

const cache = new CellMeasurerCache({
  defaultHeight: 703,
  fixedWidth: true
})

const getRowRender = (posts, layout) => ({ index, parent, style }) => {
  const post = posts[index]

  return (
    <div key={post.id} style={{}}>
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        parent={parent}
        rowIndex={index}
      >
        {({ measure, registerChild }) => (
          <div style={{ margin: 0, ...style }} ref={registerChild}>
            <Post layout={layout} post={post} index={index} measure={measure} />
          </div>
        )}
      </CellMeasurer>
    </div>
  )
}
