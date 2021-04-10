import { useMutation } from 'urql'
import {
  BAN_USER_FROM_SERVER,
  BLOCK_USER,
  CREATE_FRIEND_REQUEST,
  HIDE_DM,
  REMOVE_FRIEND,
  REVOKE_FRIEND_REQUEST
} from '@/graphql/mutations'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { KICK_USER_FROM_SERVER } from '@/graphql/mutations/server/KickUserFromServer'
import { ServerPermission } from '@/types/ServerPermission'
import { useCurrentUser } from '@/providers/UserProvider'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useUserRelationships } from '@/providers/DataProvider'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useStore } from '@/hooks/useStore'
import { useHistory } from 'react-router-dom'
import { VIEW_DM } from '@/graphql/mutations/dm/ViewDm'

export default function UserContextMenu({
  user,
  server,
  isDm,
  ContextMenuItem
}) {
  const { t } = useTranslation()
  const currentUser = useCurrentUser()

  const [
    canBanUser,
    canKickUser,
    canChangeNickname,
    canManageNicknames
  ] = useHasServerPermissions({
    serverId: server?.id,
    permissions: [
      ServerPermission.BanUser,
      ServerPermission.KickUser,
      ServerPermission.ChangeNickname,
      ServerPermission.ManageNicknames
    ]
  })

  const [_hideRes, hideDm] = useMutation(HIDE_DM)
  const [_viewRes, viewDm] = useMutation(VIEW_DM)
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
  const isFriend = friends.map(f => f.id).includes(user?.id)
  const hasSentFriendRequest = outgoingFriendRequests.includes(user?.id)
  const setDialogUser = useStore(s => s.setDialogUser)
  const { push } = useHistory()

  if (!user) return null
  return (
    <>
      <ContextMenuSection>
        <ContextMenuItem
          label={t('user.context.viewProfile')}
          onClick={() => {
            setDialogUser(user)
          }}
        />
        <ContextMenuItem
          onClick={() => push(`/me/dm/${user.id}`)}
          label={t('user.context.sendMessage')}
        />
        {isDm && (
          <>
            {!!user.unreadCount && (
              <ContextMenuItem
                label={t('user.context.markRead')}
                onClick={() => {
                  viewDm({ userId: user.id })
                }}
              />
            )}

            <ContextMenuItem
              label={t('user.context.closeDm')}
              onClick={() => {
                hideDm({ userId: user.id })
              }}
            />
          </>
        )}
        {user.id !== currentUser.id ? (
          <>
            {isFriend ? (
              <ContextMenuItem
                label={t('user.context.removeFriend')}
                onClick={() => removeFriend({ userId: user.id })}
                red
              />
            ) : (
              <ContextMenuItem
                label={t('user.context.addFriend')}
                onClick={() => createFriendRequest({ userId: user.id })}
              />
            )}
          </>
        ) : (
          <></>
        )}
        {!!server && (canManageNicknames || canBanUser || canKickUser) && (
          <>
            {canManageNicknames && (
              <ContextMenuItem label={t('user.context.changeNickname')} />
            )}
            {canKickUser && (
              <ContextMenuItem
                label={t('user.context.kickUser', { user: user })}
                red
                onClick={() => {
                  kickUser({ serverId: server.id, userId: user.id })
                  toast.success(t('user.context.kickedUser', { user: user }))
                }}
              />
            )}
            {canBanUser && (
              <ContextMenuItem
                label={t('user.context.banUser', { user: user })}
                red
                onClick={() => {
                  const reason = window.prompt(t('user.context.banPrompt'))
                  if (reason === null) return
                  banUser({
                    serverId: server.id,
                    userId: user.id,
                    reason
                  })
                  toast.success(t('user.context.bannedUser', { user: user }))
                }}
              />
            )}
          </>
        )}
      </ContextMenuSection>
    </>
  )
}
