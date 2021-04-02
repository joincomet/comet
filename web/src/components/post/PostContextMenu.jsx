import { useContextMenuEvent } from '@/components/ui/context'
import { useMutation } from 'urql'
import { useCopyToClipboard } from 'react-use'
import { REMOVE_POST, PIN_POST, UNPIN_POST } from '@/graphql/mutations'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ContextMenuItem from '@/components/ui/context/ContextMenuItem'
import ContextMenuDivider from '@/components/ui/context/ContextMenuDivider'
import ContextMenu from '@/components/ui/context/ContextMenu'
import { ServerPermission } from '@/types/ServerPermission'
import { useCurrentUser } from '@/providers/UserProvider'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'

export default function PostContextMenu() {
  const menuEvent = useContextMenuEvent()
  const post = menuEvent?.data?.post

  const [canManagePosts] = useHasServerPermissions(post.server.id, [
    ServerPermission.ManagePosts
  ])

  const [_clipboardState, copyToClipboard] = useCopyToClipboard()

  const [_removePostRes, removePost] = useMutation(REMOVE_POST)
  const [_pinPostRes, pinPost] = useMutation(PIN_POST)
  const [_unpinPostRes, unpinPost] = useMutation(UNPIN_POST)

  const { t } = useTranslation()

  const user = useCurrentUser()

  if (!menuEvent || !menuEvent.data) return null

  return (
    <ContextMenu>
      <ContextMenuSection>
        <ContextMenuItem
          onClick={() => {
            copyToClipboard(`${post.relativeUrl}`)
            toast.success(t('post.context.copiedLink'))
          }}
          label={t('post.context.copyLink')}
        />
        <ContextMenuItem label={t('post.context.addToUserFolder')} arrow />
        <ContextMenuItem label={t('post.context.sendToFriend')} arrow />
      </ContextMenuSection>
      {!(post.author.id === user.id) ? (
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
          <ContextMenuSection>
            <ContextMenuItem label={t('post.context.edit')} />
            <ContextMenuItem
              red
              label={t('post.context.delete')}
              onClick={() => toast.error(t('post.context.deleted'))}
            />
          </ContextMenuSection>
        </>
      )}
      {canManagePosts && (
        <>
          <ContextMenuDivider />
          <div className="space-y-0.5">
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
