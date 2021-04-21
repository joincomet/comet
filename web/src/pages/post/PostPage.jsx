import { useMemo } from 'react'
import Post from '@/components/post/Post'
import { useParams } from 'react-router-dom'
import PostUsersSidebar from '@/pages/post/PostUsersSidebar'
import { createCommentTree, getParticipants } from '@/utils/commentUtils'
import Comment from '@/components/comment/Comment'
import CreateCommentCard from '@/components/comment/CreateCommentCard'
import { useStore } from '@/hooks/useStore'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/graphql/hooks'
import { useTranslation } from 'react-i18next'
import PostHeader from '@/pages/post/PostHeader'
import Page from '@/components/ui/page/Page'
import { useCommentsQuery, usePostQuery } from '@/graphql/hooks'

export default function PostPage() {
  const { t } = useTranslation()
  const { postId, serverId } = useParams()

  const [canViewComments, canCreateComment] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.ViewComments, ServerPermission.CreateComment]
  })

  const { data } = usePostQuery({
    variables: {
      postId
    }
  })
  const post = data?.post

  const { data: commentsData } = useCommentsQuery({
    variables: { postId }
  })
  const comments = useMemo(
    () => createCommentTree(commentsData?.comments ?? []),
    [commentsData?.comments]
  )
  const users = useMemo(() => getParticipants(comments), [comments])
  const showUsers = useStore(s => s.showUsers)

  return (
    <Page
      header={<PostHeader post={post} />}
      rightSidebar={<PostUsersSidebar post={post} users={users} />}
    >
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
