import Layout from '../components/Layout'
import ReactDOM from 'react-dom'
import { WindowScroller, List } from 'react-virtualized'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import { gql } from '@apollo/client'
import Post from '../components/Post'
import { useState } from 'react'
import { initializeApollo } from '@/apollo/client'

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

const getRowRender = posts => ({ index, style }) => {
  const post = posts[index]

  return (
    <Draggable draggableId={post.id} index={index} key={post.id}>
      {(provided, snapshot) => (
        <Post
          provided={provided}
          post={post}
          isDragging={snapshot.isDragging}
          style={{ margin: 0, ...style }}
          index={index}
        />
      )}
    </Draggable>
  )
}

function Posts({ initial }) {
  const [posts, setPosts] = useState(() => initial)

  return (
    <DragDropContext>
      <Droppable
        droppableId="droppable"
        mode="virtual"
        renderClone={(provided, snapshot, rubric) => (
          <Post
            provided={provided}
            isDragging={snapshot.isDragging}
            post={posts[rubric.source.index]}
            style={{ margin: 0 }}
            index={rubric.source.index}
          />
        )}
      >
        {droppableProvided => (
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              <List
                autoHeight
                rowCount={posts.length}
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                rowHeight={110}
                width={1000}
                ref={ref => {
                  // react-virtualized has no way to get the list's ref that I can so
                  // So we use the `ReactDOM.findDOMNode(ref)` escape hatch to get the ref
                  if (ref) {
                    // eslint-disable-next-line react/no-find-dom-node
                    const whatHasMyLifeComeTo = ReactDOM.findDOMNode(ref)
                    if (whatHasMyLifeComeTo instanceof HTMLElement) {
                      droppableProvided.innerRef(whatHasMyLifeComeTo)
                    }
                  }
                }}
                rowRenderer={getRowRender(posts)}
              />
            )}
          </WindowScroller>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default function Home({ posts }) {
  return (
    <Layout>
      <div className="page">
        <div className="container py-5 mx-auto sm:px-5 2xl:px-80">
          <div>
            <Posts initial={posts} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const client = initializeApollo()

  const { data } = await client.query({
    query: POSTS
  })

  return {
    props: {
      posts: data.posts,
    }
  }
}
