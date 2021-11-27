import { useMemo } from 'react'
import Post from '@/components/post/Post'
import PostUsersSidebar from '@/pages/post/PostUsersSidebar'
import { createCommentTree, getParticipants } from '@/utils/commentUtils'
import Comment from '@/components/comment/Comment'
import CreateCommentCard from '@/components/comment/CreateCommentCard'
import PostHeader from '@/pages/post/PostHeader'
import Page from '@/components/ui/page/Page'
import { useCommentsQuery, usePostQuery } from '@/graphql/hooks'
import { Helmet } from 'react-helmet-async'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import NotFound from '@/pages/NotFound'
import Avatar from '@/components/ui/Avatar'

const NUMBER_OF_SKELETON_COMMENTS = 10

export default function PostPage({ postId }) {
  const [currentUser] = useCurrentUser()

  const { data, loading } = usePostQuery({
    variables: {
      id: postId
    },
    fetchPolicy: 'cache-and-network'
  })
  const post = data?.post

  const { data: commentsData } = useCommentsQuery({
    variables: { postId }
  })
  const comments = useMemo(
    () => createCommentTree(commentsData?.comments ?? []),
    [commentsData?.comments]
  )
  const users = useMemo(() => getParticipants(comments, post), [comments])

  const skeletonComments = []
  for (let i = 0; i < NUMBER_OF_SKELETON_COMMENTS; i++) {
    skeletonComments.push(
      <div className={`relative md:rounded dark:bg-gray-800 bg-gray-200`}>
        <div className="flex px-3 pt-3 animate-pulse">
          <Avatar
            size={7}
            className="dark:bg-gray-750 bg-gray-300 rounded-full"
          />
          <div className={`pl-3 pb-3 w-full border-b dark:border-gray-750`}>
            <div className="flex flex-wrap items-center mb-1.5 h-5 dark:bg-gray-750 bg-gray-300 w-full  rounded"></div>
            <div className="flex flex-wrap items-center mb-1.5 h-5 dark:bg-gray-750 bg-gray-300 w-full  rounded"></div>
            <div className="flex flex-wrap items-center mb-1.5 h-5 dark:bg-gray-750 bg-gray-300 w-full  rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Page
      header={
        post ? (
          <PostHeader post={post} />
        ) : loading ? (
          <header
            id="header"
            className={`h-12 min-h-[3rem] bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex items-center animate-pulse`}
          >
            <div
              className={`flex items-center font-semibold text-base text-primary pl-4`}
            >
              <div className="highlightable mr-3 cursor-pointer"></div>
              <span className="line-clamp-1"></span>
            </div>
            <div className="ml-auto pl-6 pr-4"></div>
          </header>
        ) : null
      }
      rightSidebar={
        post ? <PostUsersSidebar post={post} users={users} /> : null
      }
    >
      <Helmet>
        <title>
          {post ? `${post.title} – ${post.server.displayName}` : null}
        </title>
      </Helmet>
      {post || loading ? (
        <div
          className={`max-h-full h-full scrollbar-custom dark:bg-gray-750 ${
            loading ? 'overflow-y-hidden' : 'overflow-y-auto'
          }`}
        >
          <div className="md:pt-4 md:px-4 px-0 pt-0">
            {post ? (
              <Post post={post} isPostPage />
            ) : loading ? (
              <div
                style={{ opacity: 1 }}
                className={`relative group hover:shadow dark:bg-gray-800 bg-gray-200 px-2 py-3 md:rounded rounded`}
              >
                <div className="flex animate-pulse">
                  <div className="flex flex-col items-center mr-2 w-10 dark:bg-gray-750 bg-gray-300 h-14 rounded"></div>

                  <div className="pr-4 flex-grow flex flex-col">
                    <div className="flex flex-wrap items-center mb-1.5 h-5 dark:bg-gray-750 bg-gray-300 w-1/4  rounded"></div>

                    <div className="text-secondary font-medium text-base w-1/2 dark:bg-gray-750 bg-gray-300 h-5 rounded"></div>

                    <div className="mt-1.5 pb-2 w-full dark:bg-gray-750 bg-gray-300 h-20 rounded"></div>

                    <div className="flex items-center mt-1.5 w-1/4 dark:bg-gray-750 bg-gray-300 h-5 rounded">
                      <div
                        className={`select-none text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
                      >
                        <div className="ml-2 text-xs font-medium"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {currentUser ? (
            <div className="pt-4 px-4">
              <CreateCommentCard postId={postId} />
            </div>
          ) : loading ? (
            <div className="pt-4 px-4">
              <div className="dark:bg-gray-700 h-13 rounded bg-gray-200 animate-pulse"></div>
            </div>
          ) : null}

          <div className="space-y-2 md:px-4 pt-4 px-0 pb-96">
            {commentsData && comments
              ? comments.map(comment => (
                  <Comment key={comment.id} comment={comment} post={post} />
                ))
              : skeletonComments}
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </Page>
  )
}
