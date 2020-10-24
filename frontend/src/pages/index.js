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
import { useState } from 'react'
import { initializeApollo } from '@/lib/apolloClient'
import FolderSidebar from '@/components/FolderSidebar'
import { motion } from 'framer-motion'
import GalaxiesSlider from '@/components/GalaxiesSlider'
import { FiEdit } from 'react-icons/fi'
import {
  HiOutlineClock,
  HiOutlineFire,
  HiOutlineSortAscending
} from 'react-icons/hi'
import { RiFireLine } from 'react-icons/ri'
import { AiOutlineFire } from 'react-icons/ai'
import SearchBar from '@/components/SearchBar'
import SortDropdown from '@/components/SortDropdown'

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
  defaultHeight: 703,
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
          {({ measure, registerChild }) => (
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
                measure={measure}
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
                {({ measure, registerChild }) => (
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
                      measure={measure}
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
                overscanRowCount={20}
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
  const [searchFocused, setSearchFocused] = useState(false)

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
            <GalaxiesSlider />
            <div className="container pt-5 mx-auto sm:px-5 2xl:px-80">
              <div className="sm:rounded-md dark:bg-gray-800 bg-white px-8 py-5 flex mb-2 sm:mb-5 cursor-pointer shadow-lg transform hover:scale-101 transition duration-150 ease-in-out">
                <img
                  src="https://pbs.twimg.com/profile_images/1312166598086598658/I2-2CTFg_400x400.jpg"
                  className="w-12 h-12 rounded-full mr-7"
                />
                <div>
                  <div className="text-base font-semibold inline-flex items-center">
                    Share something with the community
                    <FiEdit className="w-5 h-5 ml-5 text-tertiary" />
                  </div>
                  <div className="mt-1 text-xs font-mono text-tertiary">
                    Post images, links, and text
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-5">
                <SearchBar
                  slashFocus={true}
                  className="shadow-md w-full h-10 text-sm px-16 rounded-full dark:bg-gray-800 outline-none transition duration-200 ease-in-out border border-gray-800 focus:border-blue-500"
                />
                <div className="h-10 px-8 inline-flex items-center cursor-pointer text-sm hover:text-blue-500 transition duration-150 ease-in-out text-tertiary">
                  <RiFireLine className="w-4 h-4 mr-4" />
                  Hot
                </div>
                {/*<SortDropdown />*/}
              </div>

              <div className="flex items-center text-xs text-tertiary font-mono space-x-5 mb-3 px-6">
                <span className="font-bold cursor-pointer hover:underline">
                  Cards
                </span>
                <span className="cursor-pointer hover:underline">
                  Condensed
                </span>
              </div>

              <Posts initial={posts} />
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
