import { useContextMenuEvent } from 'react-context-menu-wrapper'
import { useMutation } from 'urql'
import { useCopyToClipboard } from 'react-use'
import { REMOVE_POST, PIN_POST, UNPIN_POST } from '@/graphql/mutations'
import toast from 'react-hot-toast'
import { useHasServerPermissions } from '@/lib/hasPermission'
import { useTranslation } from 'react-i18next'
import ContextMenuItem from '@/components/context-menus/ContextMenuItem'
import ContextMenuDivider from '@/components/context-menus/ContextMenuDivider'
import ContextMenu from '@/components/context-menus/ContextMenu'
import { ServerPermission } from '@/lib/ServerPermission'

export default function PostContextMenu() {
  const menuEvent = useContextMenuEvent()
  if (!menuEvent || !menuEvent.data) return null
  const { post } = menuEvent.data

  const [canManagePosts] = useHasServerPermissions(
    [ServerPermission.ManagePosts],
    post.server.id
  )

  const [_clipboardState, copyToClipboard] = useCopyToClipboard()

  const [_removePostRes, removePost] = useMutation(REMOVE_POST)
  const [_pinPostRes, pinPost] = useMutation(PIN_POST)
  const [_unpinPostRes, unpinPost] = useMutation(UNPIN_POST)

  const { t } = useTranslation()

  return (
    <ContextMenu>
      <div className="space-y-0.5">
        <ContextMenuItem
          onClick={() => {
            copyToClipboard(`${post.relativeUrl}`)
            toast.success(t('post.context.copiedLink'))
          }}
          label={t('post.context.copyLink')}
        />
        <ContextMenuItem label={t('post.context.addToUserFolder')} arrow />
        <ContextMenuItem label={t('post.context.sendToFriend')} arrow />
      </div>
      {!post.author.isCurrentUser ? (
        <>
          <ContextMenuDivider />
          <ContextMenuItem
            label={t('post.context.report')}
            red
            onClick={() => toast.error(t('post.context.reported'))}
          />
        </>
      ) : (
        <>
          <ContextMenuDivider />
          <div className="space-y-0.5">
            <ContextMenuItem label={t('post.context.edit')} />
            <ContextMenuItem
              red
              label={t('post.context.delete')}
              onClick={() => toast.error(t('post.context.deleted'))}
            />
          </div>
        </>
      )}
      {(canManagePosts || canPinPost || canAddToFolder) && (
        <>
          <ContextMenuDivider />
          <div className="space-y-0.5">
            {canAddToFolder && (
              <ContextMenuItem
                arrow
                label={t('post.context.addToServerFolder')}
              />
            )}
            {canPinPost && (
              <ContextMenuItem
                label={
                  post.isPinned
                    ? t('post.context.unpin')
                    : t('post.context.pin')
                }
                onClick={() => {
                  if (post.isPinned) {
                    unpinPost({ postId: post.id })
                    toast.success(t('post.context.unpinned'))
                  } else {
                    pinPost({ postId: post.id })
                    toast.success(t('post.context.pinned'))
                  }
                }}
              />
            )}
            {canManagePosts && (
              <ContextMenuItem
                label={t('post.context.remove')}
                red
                onClick={() => {
                  const reason = window.prompt(t('post.context.removePrompt'))
                  if (reason === null) return
                  removePost({ postId: post.id, reason })
                  toast.success(t('post.context.removed'))
                }}
              />
            )}
          </div>
        </>
      )}
    </ContextMenu>
  )
}
