import React from 'react'
import { useContextMenuEvent } from 'react-context-menu-wrapper'
import { Menu } from '@headlessui/react'
import { useUser } from '@/components/providers/UserProvider'
import { IconChevrownRight } from '@/lib/Icons'
import { useMutation, useQuery } from 'urql'
import { GET_SERVER_PERMISSIONS } from '@/graphql/queries'
import { useCopyToClipboard } from 'react-use'
import {
  REMOVE_POST,
  PIN_POST,
  UNPIN_POST,
  BAN_USER_FROM_SERVER,
  BLOCK_USER,
  CREATE_FRIEND_REQUEST,
  REVOKE_FRIEND_REQUEST
} from '@/graphql/mutations'
import toast from 'react-hot-toast'
import { ServerPermission, useHasServerPermissions } from '@/lib/hasPermission'
import { useTranslation } from 'react-i18next'
import ContextMenuItem from '@/components/context-menus/ContextMenuItem'
import ContextMenuDivider from '@/components/context-menus/ContextMenuDivider'
import ContextMenu from '@/components/context-menus/ContextMenu'
import { useParams } from 'react-router-dom'
import { KICK_USER_FROM_SERVER } from '@/graphql/mutations/server/KickUserFromServer'

export default function UserContextMenu() {
  const menuEvent = useContextMenuEvent()
  if (!menuEvent || !menuEvent.data) return null
  const { user, server, showCloseDm } = menuEvent.data

  const [
    canBanUser,
    canKickUser,
    canChangeNickname,
    canManageNicknames
  ] = useHasServerPermissions(
    [
      ServerPermission.BanUser,
      ServerPermission.KickUser,
      ServerPermission.ChangeNickname,
      ServerPermission.ManageNicknames
    ],
    server?.id
  )

  const [_banRes, banUser] = useMutation(BAN_USER_FROM_SERVER)
  const [_kickRes, kickUser] = useMutation(KICK_USER_FROM_SERVER)
  const [_blockRes, blockUser] = useMutation(BLOCK_USER)
  const [_addFriendRes, createFriendRequest] = useMutation(
    CREATE_FRIEND_REQUEST
  )
  const [_removeFriendRes, revokeFriendRequest] = useMutation(
    REVOKE_FRIEND_REQUEST
  )

  const { t } = useTranslation()

  return (
    <ContextMenu>
      <div className="space-y-0.5">
        <ContextMenuItem label={t('user.profile')} />
        <ContextMenuItem label={t('user.message')} />
      </div>
      {!user.isCurrentUser ? (
        <>
          <ContextMenuDivider />
          <ContextMenuItem
            label={t('user.addFriend')}
            onClick={() => createFriendRequest({ userId: user.id })}
          />
        </>
      ) : (
        <></>
      )}
      {!!server && (canManageNicknames || canBanUser || canKickUser) && (
        <>
          <ContextMenuDivider />
          <div className="space-y-0.5">
            {canManageNicknames && (
              <ContextMenuItem label={t('server.changeNickname')} />
            )}
            {canKickUser && (
              <ContextMenuItem
                label={t('server.kickUser', { user })}
                red
                onClick={() => {
                  kickUser({ serverId: server.id, userId: user.id })
                  toast.success(t('server.kickedUser', { user }))
                }}
              />
            )}
            {canBanUser && (
              <ContextMenuItem
                label={t('server.banUser', user)}
                red
                onClick={() => {
                  const reason = window.prompt(t('server.banPrompt'))
                  if (reason === null) return
                  banUser({ serverId: server.id, userId: user.id, reason })
                  toast.success(t('server.bannedUser', { user }))
                }}
              />
            )}
          </div>
        </>
      )}
    </ContextMenu>
  )
}
