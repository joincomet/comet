import Layout from '../components/Layout'
import ReactDOM from 'react-dom'
import React from 'react'
import {
  WindowScroller,
  List,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import { gql } from '@apollo/client'
import Post from '../components/Post'
import { createRef, useState } from 'react'
import { initializeApollo } from '@/apollo/client'
import FolderSidebar from '@/components/FolderSidebar'
import { motion } from 'framer-motion'

const POSTS = gql`
  query Posts {
    posts(sort: HOT) {
      id
      id36
      title
      textContent
      linkURL
      imageURLs
      relativeURL
      commentCount
      rocketCount
      embed {
        links {
          icon {
            href
          }
          thumbnail {
            href
          }
        }
        meta {
          title
          description
        }
      }
      domain
      planet {
        name
      }
      author {
        username
        profile {
          avatarURL
        }
      }
      timeSince
      timeSinceEdited
    }
  }
`

const cache = new CellMeasurerCache({
  defaultHeight: 400,
  fixedWidth: true
})

const getRowRender = ({ posts, snapshot, provided }) => ({
  index,
  parent,
  style
}) => {
  const post = posts[index]
  const shouldRenderClone = post.id === snapshot.draggingFromThisWith

  return (
    <React.Fragment key={post.id}>
      {shouldRenderClone ? (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          parent={parent}
          rowIndex={index}
        >
          {({ registerChild }) => (
            <motion.div
              animate={{ opacity: 0.5 }}
              style={{ margin: 0, ...style }}
              className="react-beatiful-dnd-copy"
              ref={registerChild}
            >
              <Post post={post} isDragging={false} index={index} />
            </motion.div>
          )}
        </CellMeasurer>
      ) : (
        <Draggable draggableId={post.id} index={index} key={post.id}>
          {(provided, snapshot) =>
            snapshot.isDragging ? (
              <div style={{ margin: 0, ...style }}>
                <Post
                  provided={provided}
                  snapshot={snapshot}
                  post={post}
                  isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                  index={index}
                />
              </div>
            ) : (
              <CellMeasurer
                cache={cache}
                columnIndex={0}
                parent={parent}
                rowIndex={index}
              >
                {({ registerChild }) => (
                  <div style={{ margin: 0, ...style }} ref={registerChild}>
                    <Post
                      provided={provided}
                      snapshot={snapshot}
                      post={post}
                      isDragging={
                        snapshot.isDragging && !snapshot.isDropAnimating
                      }
                      index={index}
                    />
                  </div>
                )}
              </CellMeasurer>
            )
          }
        </Draggable>
      )}
    </React.Fragment>
  )
}

function Posts({ initial }) {
  const [posts] = useState(() => initial)

  function onDragEnd(result) {}

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="droppable"
          mode="virtual"
          isDropDisabled={true}
          renderClone={(provided, snapshot, rubric) => (
            <div style={{ margin: 0 }} className="outline-none">
              <Post
                provided={provided}
                snapshot={snapshot}
                isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
                post={posts[rubric.source.index]}
                index={rubric.source.index}
              />
            </div>
          )}
        >
          {(provided, snapshot) => (
            <WindowScroller>
              {({ height, isScrolling, onChildScroll, scrollTop }) => (
                <List
                  autoHeight={true}
                  height={height}
                  autoWidth
                  width={10000}
                  rowCount={posts.length}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  rowHeight={cache.rowHeight}
                  deferredMeasurementCache={cache}
                  className="virtual-list outline-none"
                  ref={ref => {
                    // react-virtualized has no way to get the list's ref that I can so
                    // So we use the `ReactDOM.findDOMNode(ref)` escape hatch to get the ref
                    if (ref) {
                      // eslint-disable-next-line react/no-find-dom-node
                      const whatHasMyLifeComeTo = ReactDOM.findDOMNode(ref)
                      if (whatHasMyLifeComeTo instanceof HTMLElement) {
                        provided.innerRef(whatHasMyLifeComeTo)
                      }
                    }
                  }}
                  rowRenderer={getRowRender({ posts, snapshot, provided })}
                />
              )}
            </WindowScroller>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default function Home({ posts }) {
  return (
    <>
      <style jsx>{`
        .virtual-list {
          flex-basis: auto !important;
        }
        [data-rbd-placeholder-context-id] {
          display: none !important;
        }
        .react-beatiful-dnd-copy {
          transform: none !important;
        }
        [data-rbd-draggable-id] {
          will-change: transform, opacity;
        }
      `}</style>

      <Layout>
        <div className="page">
          <div className="container pt-5 mx-auto sm:px-5 2xl:px-80">
            <div>
              <Posts initial={posts} />
            </div>
          </div>
        </div>
        <FolderSidebar />
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const client = initializeApollo()

  const { data } = await client.query({
    query: POSTS
  })

  return {
    props: {
      posts: data.posts
    }
  }
}
