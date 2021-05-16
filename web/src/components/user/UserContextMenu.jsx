import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  RelationshipStatus,
  ServerPermission,
  useRemoveFriendMutation
} from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import { useStore } from '@/hooks/useStore'
import { useHistory } from 'react-router-dom'
import {
  useBanUserFromServerMutation,
  useCloseDmMutation,
  useCreateFriendRequestMutation,
  useKickUserFromServerMutation,
  useReadDmMutation
} from '@/graphql/hooks'

export default function UserContextMenu({
  user,
  server,
  isDm,
  ContextMenuItem
}) {
  const { t } = useTranslation()
  const [currentUser] = useCurrentUser()

  const [canManageUsers] = useHasServerPermissions({
    server,
    permissions: [ServerPermission.ManageUsers]
  })

  const [closeDm] = useCloseDmMutation()
  const [readDm] = useReadDmMutation()
  const [banUser] = useBanUserFromServerMutation()
  const [kickUser] = useKickUserFromServerMutation()
  const [createFriendRequest] = useCreateFriendRequestMutation()
  const [removeFriend] = useRemoveFriendMutation()

  const setDialogUserId = useStore(s => s.setDialogUserId)
  const { push } = useHistory()

  if (!user) return null
  return (
    <>
      <ContextMenuSection>
        <ContextMenuItem
          label={t('user.context.viewProfile')}
          onClick={() => {
            setDialogUserId(user.id)
          }}
        />
        {isDm && (
          <>
            {!!user.unreadCount && (
              <ContextMenuItem
                label={t('user.context.markRead')}
                onClick={() => {
                  readDm({ variables: { input: { userId: user.id } } })
                }}
              />
            )}

            <ContextMenuItem
              label={t('user.context.closeDm')}
              onClick={() => {
                closeDm({ variables: { input: { userId: user.id } } })
              }}
            />
          </>
        )}

        {user.id !== currentUser.id ? (
          <>
            {!isDm && (
              <ContextMenuItem
                onClick={() => push(`/dm/${user.id}`)}
                label={t('user.context.sendMessage')}
              />
            )}
          </>
        ) : (
          <></>
        )}
        {!!server && canManageUsers && (
          <>
            <ContextMenuItem
              label={t('user.context.kickUser', { user: user })}
              red
              onClick={() => {
                kickUser({
                  variables: {
                    input: { serverId: server.id, userId: user.id }
                  }
                })
                toast.success(t('user.context.kickedUser', { user: user }))
              }}
            />

            <ContextMenuItem
              label={t('user.context.banUser', { user: user })}
              red
              onClick={() => {
                const reason = window.prompt(t('user.context.banPrompt'))
                if (reason === null) return
                banUser({
                  variables: {
                    input: {
                      serverId: server.id,
                      userId: user.id,
                      reason
                    }
                  }
                })
                toast.success(t('user.context.bannedUser', { user: user }))
              }}
            />
          </>
        )}
      </ContextMenuSection>
    </>
  )
}
