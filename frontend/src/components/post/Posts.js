import React, { useEffect, useState } from 'react'
import Post from '@/components/post/Post'
import {
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller
} from 'react-virtualized'
import { useWindowSize } from '@/hooks/useWindowSize'

export default function Posts({ initial }) {
  const [posts] = useState(() => initial)

  const handleResize = event => {
    cache.clearAll()
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  const windowSize = useWindowSize()

  return (
    <div>
      <WindowScroller>
        {({ isScrolling, onChildScroll, scrollTop }) => (
          <List
            overscanRowCount={10}
            autoHeight={true}
            height={1080}
            autoWidth
            width={10000}
            rowCount={posts.length}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            scrollTop={scrollTop}
            rowHeight={cache.rowHeight}
            deferredMeasurementCache={cache}
            className="virtual-list outline-none"
            style={{ overflowX: 'hidden !important' }}
            rowRenderer={getRowRender({
              posts,
              windowSize
            })}
          />
        )}
      </WindowScroller>
    </div>
  )
}

const cache = new CellMeasurerCache({
  defaultHeight: 703,
  fixedWidth: true
})

const getRowRender = ({ posts, mousePosition }) => ({
  index,
  parent,
  style
}) => {
  const post = posts[index]

  return (
    <div key={index} style={{}}>
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        parent={parent}
        rowIndex={index}
      >
        {({ measure, registerChild }) => (
          <div style={{ margin: 0, ...style }} ref={registerChild}>
            <Post
              post={post}
              isDragging={false}
              index={index}
              mousePosition={mousePosition}
              measure={measure}
            />
          </div>
        )}
      </CellMeasurer>
    </div>
  )
}
