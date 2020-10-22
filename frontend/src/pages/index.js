import Layout from '../components/Layout'
import ReactDOM from 'react-dom'
import React, { useEffect } from 'react'
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

const getRowRender = ({ posts, snapshot, provided, mousePosition }) => ({
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
              transition={{ ease: 'easeInOut' }}
              className="react-beatiful-dnd-copy"
              ref={registerChild}
            >
              <Post
                post={post}
                isDragging={false}
                index={index}
                mousePosition={mousePosition}
              />
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
                  mousePosition={mousePosition}
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
                      mousePosition={mousePosition}
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
  const [mousePosition, setMousePosition] = useState(() => ({ x: 0, y: 0 }))

  const handleClick = event => {
    const el = event.target
    setMousePosition({
      x: event.offsetX + el.offsetLeft,
      y: event.offsetY + el.offsetTop
    })
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleClick, {
      capture: true,
      passive: false
    })
    return () =>
      window.removeEventListener('mousedown', handleClick, {
        capture: true,
        passive: false
      })
  })

  return (
    <div>
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
              mousePosition={mousePosition}
            />
          </div>
        )}
      >
        {(provided, snapshot) => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <List
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
                ref={ref => {
                  if (ref) {
                    // eslint-disable-next-line react/no-find-dom-node
                    const domNode = ReactDOM.findDOMNode(ref)
                    if (domNode instanceof HTMLElement) {
                      provided.innerRef(domNode)
                    }
                  }
                }}
                rowRenderer={getRowRender({
                  posts,
                  snapshot,
                  provided,
                  mousePosition
                })}
              />
            )}
          </WindowScroller>
        )}
      </Droppable>
    </div>
  )
}

export default function Home({ posts }) {
  function onDragEnd(result) {}

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
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="page">
            <div className="container pt-5 mx-auto sm:px-5 2xl:px-80">
              <div>
                <Posts initial={posts} />
              </div>
            </div>
          </div>
          <FolderSidebar />
        </DragDropContext>
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
