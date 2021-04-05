import { useMemo } from 'react'
import { useQuery } from 'urql'
import { GET_COMMENTS, GET_POST } from '@/graphql/queries'
import Post from '@/components/post/Post'
import { useParams } from 'react-router-dom'
import PostUsersSidebar from '@/pages/post/PostUsersSidebar'
import { createCommentTree, getParticipants } from '@/utils/commentUtils'
import Comment from '@/components/comment/Comment'
import CreateCommentCard from '@/components/comment/CreateCommentCard'
import { useStore } from '@/hooks/useStore'
import PostContextMenuWrapper from '@/components/post/PostContextMenuWrapper'
import CommentContextMenuWrapper from '@/components/comment/CommentContextMenuWrapper'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/types/ServerPermission'
import { useTranslation } from 'react-i18next'
import PostHeader from '@/pages/post/PostHeader'
import { usePosts } from '@/components/post/usePosts'
import Page from '@/components/ui/page/Page'

export default function PostPage() {
  const { t } = useTranslation()
  const { postId, serverId } = useParams()

  const [serverPosts] = usePosts({ serverId })
  const [feedPosts] = usePosts({})
  const foundPost =
    serverPosts.find(p => p.id === postId) ??
    feedPosts.find(p => p.id === postId)

  const [canViewComments, canCreateComment] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.ViewComments, ServerPermission.CreateComment]
  })

  const [{ data }] = useQuery({
    query: GET_POST,
    variables: {
      postId
    },
    pause: !!foundPost
  })
  const post = foundPost ? foundPost : data?.getPost

  const [{ data: commentsData }] = useQuery({
    query: GET_COMMENTS,
    variables: { postId }
  })
  const comments = useMemo(
    () => createCommentTree(commentsData?.getComments ?? []),
    [commentsData?.getComments]
  )
  const users = useMemo(() => getParticipants(comments), [comments])
  const showUsers = useStore(s => s.showUsers)

  return (
    <Page
      header={<PostHeader post={post} />}
      rightSidebar={<PostUsersSidebar post={post} users={users} />}
    >
      <PostContextMenuWrapper />
      <CommentContextMenuWrapper />

      <div className="max-h-full h-full scrollbar dark:bg-gray-750">
        <div className="pt-4 px-4">
          {!!post && <Post post={post} isPostPage />}
        </div>

        {canCreateComment && (
          <div className="pt-4 px-4">
            <CreateCommentCard postId={postId} />
          </div>
        )}

        {canViewComments ? (
          <div className="space-y-2 px-4 pt-4 pb-96">
            {comments.map((comment, index) => (
              <Comment
                key={comment.id}
                comment={comment}
                post={post}
                isLast={index < comments.length - 1}
              />
            ))}
          </div>
        ) : (
          <div className="py-10 px-4 text-center font-semibold text-xl text-tertiary">
            {t('comment.noPermission')}
          </div>
        )}
      </div>
    </Page>
  )
}
