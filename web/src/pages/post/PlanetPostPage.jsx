import Post from '@/components/post/Post'
import React, { useState } from 'react'
import Comment from '@/components/comment/Comment'
import PlanetSidebar from '@/pages/planet/PlanetSidebar'
import Header from '@/components/ui/header/Header'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbar } from 'react-scrollbars-custom'
import CommentsSidebar from '@/pages/post/PlanetPostSidebar'
import { HiUsers } from 'react-icons/hi'
import { useParams } from 'react-router-dom'

function PostPage({ postVariables }) {
  const query = useParams()
  const commentVariables = {
    postId: query.postId,
    sort: query.sort ? query.sort.toUpperCase() : 'TOP'
  }
  const commentsQuery = useComments(commentVariables)
  const { comments, commentCount, users } = commentsQuery.data || {
    comments: [],
    commentCount: 0
  }
  const [parentComment, setParentComment] = useState(null)

  const planet = usePlanet({ name: query.planetName }).data

  const {
    slideoutRight,
    slideoutLeft,
    menuLeft,
    menuRight,
    header,
    panel
  } = useSlideout()

  return (
    <>
      <NextSeo
        title={
          post.title
            ? `${post.title} – CometX`
            : `Post by @${post.author.username} – CometX`
        }
        description={
          post.textContent
            ? post.textContent.replace(/(<([^>]+)>)/gi, '')
            : `Submitted ${post.timeSince} by @${post.author.username}`
        }
        openGraph={{
          images: [
            {
              url:
                post.imageUrls && post.imageUrls.length > 0
                  ? post.imageUrls[0]
                  : post.thumbnailUrl
            }
          ]
        }}
      />

      <Header
        title={post.title || post?.meta?.title || '(untitled)'}
        ref={header}
        slideoutLeft={slideoutLeft}
        slideoutRight={slideoutRight}
        rightSidebarIcon={<HiUsers className="w-5 h-5" />}
      />
      <PlanetSidebar planet={planet} ref={menuLeft} />
      <CommentsSidebar post={post} users={users || []} ref={menuRight} />

      <main
        className="slideout-panel slideout-panel--right slideout-panel--header"
        id="panel"
        ref={panel}
      >
        <AutoSizer disableWidth>
          {({ height }) => (
            <Scrollbar mobileNative style={{ width: '100%', height }}>
              <Post postData={post} embed actionsLast />

              <div className="border-t-2 dark:border-gray-700">
                <div className="px-4 py-3 text-sm font-medium text-secondary">
                  {post.commentCount} Comment
                  {post.commentCount === 1 ? '' : 's'}
                </div>
                {comments.map((comment, index) => (
                  <Comment
                    commentData={comment}
                    post={post}
                    key={comment.id}
                    setParentComment={setParentComment}
                  />
                ))}

                {comments.length > 0 && <div className="h-64" />}
              </div>
            </Scrollbar>
          )}
        </AutoSizer>
      </main>
    </>
  )
}

export default PostPage

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const { query } = ctx

  const k = ['planet', { name: query.planetName }]

  await queryClient.prefetchQuery(k, key => fetchPlanet(key, ctx))

  const planet = queryClient.getQueryData(k)

  if (query.planetName !== planet.name)
    return {
      redirect: {
        destination: `/planet/${planet.name}/post/${query.postId}`,
        permanent: true
      }
    }

  const postId = query.postId
  const postVariables = { postId }
  /*const commentVariables = {
    postId,
    sort: query.sort ? query.sort.toUpperCase() : 'TOP'
  }*/

  await queryClient.prefetchQuery(['post', postVariables], key =>
    fetchPost(key, ctx)
  )

  /*await queryClient.prefetchQuery(['comments', commentVariables], key =>
    fetchComments(key, ctx)
  )*/

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      postVariables
    }
  }
}
