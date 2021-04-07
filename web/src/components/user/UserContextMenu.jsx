import { useContextMenuEvent } from '@/components/ui/context'
import { useMutation } from 'urql'
import {
  BAN_USER_FROM_SERVER,
  BLOCK_USER,
  CREATE_FRIEND_REQUEST,
  REMOVE_FRIEND,
  REVOKE_FRIEND_REQUEST
} from '@/graphql/mutations'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import ContextMenuItem from '@/components/ui/context/ContextMenuItem'
import ContextMenuDivider from '@/components/ui/context/ContextMenuDivider'
import ContextMenu from '@/components/ui/context/ContextMenu'
import { KICK_USER_FROM_SERVER } from '@/graphql/mutations/server/KickUserFromServer'
import { ServerPermission } from '@/types/ServerPermission'
import { useCurrentUser } from '@/providers/UserProvider'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useUserRelationships } from '@/providers/DataProvider'
import UserDialog from '@/components/user/UserDialog'
import { useEffect, useState } from 'react'

export default function UserContextMenu({
  user,
  server,
  show = true,
  button,
  dialogOpen,
  setDialogOpen,
  setDialogUser
}) {
  const { t } = useTranslation()
  const currentUser = useCurrentUser()
  const [menuUser, setMenuUser] = useState(user)
  const [menuServer, setMenuServer] = useState(server)

  const menuEvent = useContextMenuEvent()
  useEffect(() => {
    if (menuEvent && menuEvent.data) {
      setMenuUser(menuEvent.data.user)
      setMenuServer(menuEvent.data.server)
    }
  }, [menuEvent])

  const [
    canBanUser,
    canKickUser,
    canChangeNickname,
    canManageNicknames
  ] = useHasServerPermissions({
    serverId: menuServer?.id,
    permissions: [
      ServerPermission.BanUser,
      ServerPermission.KickUser,
      ServerPermission.ChangeNickname,
      ServerPermission.ManageNicknames
    ]
  })

  const [_banRes, banUser] = useMutation(BAN_USER_FROM_SERVER)
  const [_kickRes, kickUser] = useMutation(KICK_USER_FROM_SERVER)
  const [_blockRes, blockUser] = useMutation(BLOCK_USER)
  const [_addFriendRes, createFriendRequest] = useMutation(
    CREATE_FRIEND_REQUEST
  )
  const [_revokeFriendReqestRes, revokeFriendRequest] = useMutation(
    REVOKE_FRIEND_REQUEST
  )
  const [_removeFriendRes, removeFriend] = useMutation(REMOVE_FRIEND)

  const { friends, outgoingFriendRequests } = useUserRelationships()

  if (!menuUser) return null
  const isFriend = friends.map(f => f.id).includes(menuUser?.id)
  const hasSentFriendRequest = outgoingFriendRequests.includes(menuUser?.id)

  return (
    <>
      <UserDialog user={menuUser} open={dialogOpen} setOpen={setDialogOpen} />

      <ContextMenu show={show} button={button}>
        <div className="space-y-0.5">
          <ContextMenuItem
            label={t('user.context.viewProfile')}
            onClick={() => {
              setDialogUser(menuUser)
              setDialogOpen(true)
            }}
          />
          <ContextMenuItem label={t('user.context.sendMessage')} />
        </div>
        {menuUser.id !== currentUser.id ? (
          <>
            <ContextMenuDivider />
            {isFriend ? (
              <ContextMenuItem
                label={t('user.context.removeFriend')}
                onClick={() => removeFriend({ userId: menuUser.id })}
                red
              />
            ) : (
              <ContextMenuItem
                label={t('user.context.addFriend')}
                onClick={() => createFriendRequest({ userId: menuUser.id })}
              />
            )}
          </>
        ) : (
          <></>
        )}
        {!!server && (canManageNicknames || canBanUser || canKickUser) && (
          <>
            <ContextMenuDivider />
            <div className="space-y-0.5">
              {canManageNicknames && (
                <ContextMenuItem label={t('user.context.changeNickname')} />
              )}
              {canKickUser && (
                <ContextMenuItem
                  label={t('user.context.kickUser', { user: menuUser })}
                  red
                  onClick={() => {
                    kickUser({ serverId: menuServer.id, userId: menuUser.id })
                    toast.success(
                      t('user.context.kickedUser', { user: menuUser })
                    )
                  }}
                />
              )}
              {canBanUser && (
                <ContextMenuItem
                  label={t('user.context.banUser', { user: menuUser })}
                  red
                  onClick={() => {
                    const reason = window.prompt(t('user.context.banPrompt'))
                    if (reason === null) return
                    banUser({
                      serverId: menuServer.id,
                      userId: menuUser.id,
                      reason
                    })
                    toast.success(
                      t('user.context.bannedUser', { user: menuUser })
                    )
                  }}
                />
              )}
            </div>
          </>
        )}
      </ContextMenu>
    </>
  )
}
