import React from 'react'
import { useContextMenuEvent } from 'react-context-menu-wrapper'
import { Menu } from '@headlessui/react'
import { useUser } from '@/components/providers/UserProvider'
import { IconChevrownRight } from '@/lib/Icons'
import { useMutation, useQuery } from 'urql'
import { GET_SERVER_PERMISSIONS } from '@/graphql/queries'
import { useCopyToClipboard } from 'react-use'
import { REMOVE_POST, PIN_POST, UNPIN_POST } from '@/graphql/mutations'
import toast from 'react-hot-toast'
import { ServerPermission, useHasServerPermissions } from '@/lib/hasPermission'
import { useTranslation } from 'react-i18next'
import ContextMenuItem from '@/components/context-menus/ContextMenuItem'
import ContextMenuDivider from '@/components/context-menus/ContextMenuDivider'
import ContextMenu from '@/components/context-menus/ContextMenu'

export default function PostContextMenu() {
  const menuEvent = useContextMenuEvent()
  if (!menuEvent || !menuEvent.data) return null
  const { post } = menuEvent.data

  const [canPinPost, canManagePosts, canAddToFolder] = useHasServerPermissions(
    [
      ServerPermission.PinPosts,
      ServerPermission.ManagePosts,
      ServerPermission.AddPostsToFolder
    ],
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
            toast.success(t('post.copiedLink'))
          }}
          label={t('post.copyLink')}
        />
        <ContextMenuItem label={t('post.addToUserFolder')} arrow />
        <ContextMenuItem label={t('post.sendToFriend')} arrow />
      </div>
      {!post.author.isCurrentUser ? (
        <>
          <ContextMenuDivider />
          <ContextMenuItem
            label={t('post.report')}
            red
            onClick={() => toast.error(t('post.reported'))}
          />
        </>
      ) : (
        <>
          <ContextMenuDivider />
          <div className="space-y-0.5">
            <ContextMenuItem label={t('post.edit')} />
            <ContextMenuItem
              red
              label={t('post.delete')}
              onClick={() => toast.error(t('post.deleted'))}
            />
          </div>
        </>
      )}
      {(canManagePosts || canPinPost || canAddToFolder) && (
        <>
          <ContextMenuDivider />
          <div className="space-y-0.5">
            {canAddToFolder && (
              <ContextMenuItem arrow label={t('post.addToServerFolder')} />
            )}
            {canPinPost && (
              <ContextMenuItem
                label={post.isPinned ? t('post.unpin') : t('post.pin')}
                onClick={() => {
                  if (post.isPinned) {
                    unpinPost({ postId: post.id })
                    toast.success(t('post.unpinned'))
                  } else {
                    pinPost({ postId: post.id })
                    toast.success(t('post.pinned'))
                  }
                }}
              />
            )}
            {canManagePosts && (
              <ContextMenuItem
                label={t('post.remove')}
                red
                onClick={() => {
                  const reason = window.prompt(t('post.removePrompt'))
                  if (reason === null) return
                  removePost({ postId: post.id, reason })
                  toast.success(t('post.removed'))
                }}
              />
            )}
          </div>
        </>
      )}
    </ContextMenu>
  )
}
