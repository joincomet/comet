import { useMutation } from 'urql'
import {
  BAN_USER_FROM_SERVER,
  CLOSE_DM,
  CHANGE_FRIEND_STATUS
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
import { READ_DM } from '@/graphql/mutations/dm/ReadDm'
import { FriendStatus } from '@/types/FriendStatus'

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

  const [_hideRes, hideDm] = useMutation(CLOSE_DM)
  const [_viewRes, viewDm] = useMutation(READ_DM)
  const [_banRes, banUser] = useMutation(BAN_USER_FROM_SERVER)
  const [_kickRes, kickUser] = useMutation(KICK_USER_FROM_SERVER)
  const [_statusRes, changeFriendStatus] = useMutation(CHANGE_FRIEND_STATUS)

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
                onClick={() =>
                  changeFriendStatus({
                    userId: user.id,
                    status: FriendStatus.None
                  })
                }
                red
              />
            ) : (
              <ContextMenuItem
                label={t('user.context.addFriend')}
                onClick={() =>
                  changeFriendStatus({
                    userId: user.id,
                    status: FriendStatus.FriendRequestOutgoing
                  })
                }
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
