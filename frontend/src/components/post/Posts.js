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
import { usePosts } from '@/lib/usePosts'

export default function Posts({ variables, showPlanet = true }) {
  const { data, fetchNextPage } = usePosts(variables)

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

  const posts = () => {
    if (data.pages) return data.pages.map(page => page.posts).flat()
    else return data.posts
  }

  return (
    <InfiniteLoader
      isRowLoaded={index => !!posts()[index]}
      loadMoreRows={() => fetchNextPage()}
      rowCount={posts().length}
      minimumBatchSize={1}
      threshold={5}
    >
      {({ onRowsRendered, registerChild }) => (
        <WindowScroller>
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
              className="outline-none"
              containerStyle={{ position: 'static' }}
              style={{
                overflowX: 'hidden !important',
                flexBasis: 'auto !important'
              }}
              rowRenderer={getRowRender(posts(), showPlanet)}
            />
          )}
        </WindowScroller>
      )}
    </InfiniteLoader>
  )
}

const cache = new CellMeasurerCache({
  defaultHeight: 300,
  fixedWidth: true
})

const getRowRender = (posts, showPlanet = true) => ({
  index,
  parent,
  style
}) => {
  const post = posts[index]

  return (
    <CellMeasurer
      key={post.id}
      cache={cache}
      columnIndex={0}
      parent={parent}
      rowIndex={index}
    >
      {({ measure, registerChild }) => (
        <div ref={registerChild} style={style}>
          <Post
            post={post}
            index={index}
            measure={measure}
            showPlanet={showPlanet}
            className="lg:rounded-lg mb-3"
          />
        </div>
      )}
    </CellMeasurer>
  )
}
