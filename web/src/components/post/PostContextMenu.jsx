import ctl from '@netlify/classnames-template-literals'
import { IconChevrownRight } from '@/components/ui/icons/Icons'
import { useTranslation } from 'react-i18next'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/types/ServerPermission'
import { useCopyToClipboard } from 'react-use'
import { useMutation } from 'urql'
import { DELETE_POST } from '@/graphql/mutations'
import { useTogglePostVote } from '@/components/post/useTogglePostVote'
import { useTogglePostPin } from '@/components/post/useTogglePostPin'
import { useCurrentUser } from '@/providers/UserProvider'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import toast from 'react-hot-toast'

export default function PostContextMenu({ post, ContextMenuItem }) {
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
    <>
      <ContextMenuSection>
        <ContextMenuItem
          onClick={() => toggleVote()}
          label={
            post.isVoted ? t('post.context.unvote') : t('post.context.vote')
          }
        />
        <ContextMenuItem label={t('post.context.addToUserFolder')} />
        <ContextMenuItem label={t('post.context.sendToFriend')} />
        {isAuthor && <ContextMenuItem label={t('post.context.edit')} />}
        {canManagePosts && (
          <ContextMenuItem
            onClick={() => togglePin()}
            label={
              post.isPinned ? t('post.context.unpin') : t('post.context.pin')
            }
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
            red
            onClick={() => {
              deletePost({ postId: post.id })
              toast.success(t('post.context.deleted'))
            }}
            label={t('post.context.delete')}
          />
        )}
      </ContextMenuSection>
    </>
  )
}
