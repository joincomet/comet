import { useContextMenuEvent } from '@/components/ui/context'
import { useMutation } from 'urql'
import { useCopyToClipboard } from 'react-use'
import { DELETE_POST } from '@/graphql/mutations'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ContextMenuItem from '@/components/ui/context/ContextMenuItem'
import ContextMenu from '@/components/ui/context/ContextMenu'
import { ServerPermission } from '@/types/ServerPermission'
import { useCurrentUser } from '@/providers/UserProvider'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useTogglePostVote } from '@/components/post/useTogglePostVote'
import { useTogglePostPin } from '@/components/post/useTogglePostPin'

export default function PostContextMenu({ post }) {
  const { t } = useTranslation()

  const [canManagePosts] = useHasServerPermissions({
    serverId: post?.server.id,
    permissions: [ServerPermission.ManagePosts]
  })

  const copyToClipboard = useCopyToClipboard()[1]

  const [_deletePostRes, deletePost] = useMutation(DELETE_POST)

  const toggleVote = useTogglePostVote(post)
  const togglePin = useTogglePostPin(post)

  const currentUser = useCurrentUser()
  const isAuthor = post?.author?.id === currentUser.id
  const canDelete = isAuthor || canManagePosts

  if (!post) return null

  return (
    <ContextMenu>
      <ContextMenuSection>
        <ContextMenuItem
          label={
            post.isVoted ? t('post.context.unvote') : t('post.context.vote')
          }
          onClick={() => toggleVote()}
        />
        <ContextMenuItem label={t('post.context.addToUserFolder')} arrow />
        <ContextMenuItem label={t('post.context.sendToFriend')} arrow />
        {isAuthor && <ContextMenuItem label={t('post.context.edit')} />}
        {canManagePosts && (
          <ContextMenuItem
            label={
              post.isPinned ? t('post.context.unpin') : t('post.context.pin')
            }
            onClick={() => togglePin()}
          />
        )}
        <ContextMenuItem
          onClick={() => {
            copyToClipboard(`${post.relativeUrl}`)
          }}
          label={t('post.context.copyLink')}
        />
        {canDelete && (
          <ContextMenuItem
            label={t('post.context.delete')}
            red
            onClick={() => {
              deletePost({ postId: post.id })
              toast.success(t('post.context.deleted'))
            }}
          />
        )}
      </ContextMenuSection>
    </ContextMenu>
  )
}
