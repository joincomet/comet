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
import {
  getSkeletonComments,
  SkeletonPostPageLoader
} from '@/components/loaders/SkeletonLoaders'

const NUMBER_OF_SKELETON_COMMENTS = 10
const SKELETON_COMMENTS = getSkeletonComments(NUMBER_OF_SKELETON_COMMENTS)

export default function PostPage({ postId }) {
  const [currentUser, currentUserLoading] = useCurrentUser()

  const { data, loading } = usePostQuery({
    variables: {
      id: postId
    },
    fetchPolicy: 'cache-and-network'
  })
  const post = data?.post

  const { data: commentsData, loading: commentsLoading } = useCommentsQuery({
    variables: { postId }
  })
  const comments = useMemo(
    () => createCommentTree(commentsData?.comments ?? []),
    [commentsData?.comments]
  )
  const users = useMemo(() => getParticipants(comments, post), [comments])

  return (
    <Page
      header={
        post && !loading ? (
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
      rightSidebar={<PostUsersSidebar post={post} users={users} />}
    >
      <Helmet>
        <title>
          {post ? `${post.title} – ${post.server.displayName}` : null}
        </title>
      </Helmet>
      {post || loading ? (
        <div className={`max-h-full h-full scrollbar-custom dark:bg-gray-750`}>
          <div className="md:pt-4 md:px-4 px-0 pt-0">
            {post && !loading ? (
              <Post post={post} isPostPage />
            ) : (
              <SkeletonPostPageLoader />
            )}
          </div>

          {currentUser && !currentUserLoading ? (
            <div className="pt-4 px-4">
              <CreateCommentCard postId={postId} />
            </div>
          ) : currentUserLoading ? (
            <div className="pt-4 px-4 animate-pulse">
              <div className="dark:bg-gray-700 h-13 rounded bg-gray-200"></div>
            </div>
          ) : null}

          <div className="space-y-2 md:px-4 pt-4 px-0 pb-96">
            {comments && !commentsLoading
              ? comments.map(comment => (
                  <Comment key={comment.id} comment={comment} post={post} />
                ))
              : commentsLoading
              ? SKELETON_COMMENTS
              : null}
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </Page>
  )
}
