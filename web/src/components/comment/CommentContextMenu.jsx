import { useContextMenuEvent } from '@/components/ui/context'
import { useMutation } from 'urql'
import { useCopyToClipboard } from 'react-use'
import { DELETE_COMMENT } from '@/graphql/mutations'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ContextMenuItem from '@/components/ui/context/ContextMenuItem'
import ContextMenu from '@/components/ui/context/ContextMenu'
import { ServerPermission } from '@/types/ServerPermission'
import { useCurrentUser } from '@/providers/UserProvider'
import { useParams } from 'react-router-dom'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useToggleCommentVote } from '@/components/comment/useToggleCommentVote'
import { useToggleCommentPin } from '@/components/comment/useToggleCommentPin'

export default function CommentContextMenu() {
  const { t } = useTranslation()
  const currentUser = useCurrentUser()

  const menuEvent = useContextMenuEvent()
  const comment = menuEvent?.data?.comment
  const { serverId } = useParams()
  const [canManageComments, canVote, canComment] = useHasServerPermissions({
    serverId,
    permissions: [
      ServerPermission.ManageComments,
      ServerPermission.VoteComment,
      ServerPermission.CreateComment
    ]
  })
  const copyToClipboard = useCopyToClipboard()[1]
  const [_deleteRes, deleteComment] = useMutation(DELETE_COMMENT)
  const toggleVote = useToggleCommentVote(comment)
  const togglePin = useToggleCommentPin(comment)

  const isAuthor = comment.author.id === currentUser.id
  const canDelete = canManageComments || isAuthor
  const canPin = canManageComments

  if (!menuEvent || !menuEvent.data) return null

  return (
    <ContextMenu>
      <ContextMenuSection>
        {canVote && (
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
        {canPin && (
          <ContextMenuItem
            label={
              comment.isPinned
                ? t('comment.context.unpin')
                : t('comment.context.pin')
            }
            onClick={() => togglePin()}
          />
        )}
        {canComment && <ContextMenuItem label={t('comment.context.reply')} />}

        <ContextMenuItem
          onClick={() => {
            copyToClipboard(`${comment.id}`)
          }}
          label={t('comment.context.copyLink')}
        />
        {canDelete && (
          <ContextMenuItem
            label={t('comment.context.delete')}
            red
            onClick={() => toast.error(t('comment.context.deleted'))}
          />
        )}
      </ContextMenuSection>
    </ContextMenu>
  )
}
