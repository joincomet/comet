import { useCopyToClipboard } from 'react-use'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { ServerPermission } from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useToggleCommentPin } from '@/components/comment/useToggleCommentPin'
import { useStore } from '@/hooks/useStore'
import { useDeleteCommentMutation } from '@/graphql/hooks'

export default function CommentContextMenu({ comment, post, ContextMenuItem }) {
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()
  const setReplyingCommentId = useStore(s => s.setReplyingCommentId)
  const [canManageComments] = useHasServerPermissions({
    server: post.server,
    permissions: [ServerPermission.ManageComments]
  })
  const copyToClipboard = useCopyToClipboard()[1]
  const [deleteComment] = useDeleteCommentMutation()
  const togglePin = useToggleCommentPin(comment)

  const isAuthor = !!currentUser && comment.author.id === currentUser.id
  const canDelete = canManageComments || isAuthor
  return (
    <>
      <ContextMenuSection>
        {!!currentUser && (
          <ContextMenuItem
            label={
              comment.isVoted
                ? t('comment.context.unvote')
                : t('comment.context.vote')
            }
            onClick={() => toggleVote()}
          />
        )}
        {isAuthor && <ContextMenuItem label={t('comment.context.edit')} />}
        {canManageComments && (
          <ContextMenuItem
            label={
              comment.isPinned
                ? t('comment.context.unpin')
                : t('comment.context.pin')
            }
            onClick={() => togglePin()}
          />
        )}
        {!!currentUser && (
          <ContextMenuItem
            onClick={() => setReplyingCommentId(comment?.id)}
            label={t('comment.context.reply')}
          />
        )}

        {/*<ContextMenuItem
          onClick={() => {
            copyToClipboard(`${comment.id}`)
          }}
          label={t('comment.context.copyLink')}
        />*/}
        {canDelete && (
          <ContextMenuItem
            label={t('comment.context.delete')}
            red
            onClick={() => toast.error(t('comment.context.deleted'))}
          />
        )}
      </ContextMenuSection>
    </>
  )
}
