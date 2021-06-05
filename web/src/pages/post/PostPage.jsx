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

export default function PostPage({ postId }) {
  const [currentUser] = useCurrentUser()

  const { data } = usePostQuery({
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

  return (
    <Page
      header={post ? <PostHeader post={post} /> : null}
      rightSidebar={
        post ? <PostUsersSidebar post={post} users={users} /> : null
      }
    >
      <Helmet>
        <title>
          {post ? `${post.title} – ${post.server.displayName}` : null}
        </title>
      </Helmet>
      {post ? (
        <div className="max-h-full h-full scrollbar-custom dark:bg-gray-750 overflow-y-auto">
          <div className="md:pt-4 md:px-4 px-0 pt-0">
            {!!post && <Post post={post} isPostPage />}
          </div>

          {!!currentUser && (
            <div className="pt-4 px-4">
              <CreateCommentCard postId={postId} />
            </div>
          )}

          <div className="space-y-2 md:px-4 pt-4 px-0 pb-96">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                post={post}
              />
            ))}
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </Page>
  )
}
