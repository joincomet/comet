import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  ServerPermission, useGlobalBanMutation,
  useRemoveFriendMutation,
  useSetUserRoleMutation
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
  role,
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
  const [globalBan] = useGlobalBanMutation()
  const [createFriendRequest] = useCreateFriendRequestMutation()
  const [removeFriend] = useRemoveFriendMutation()

  const [setUserRole] = useSetUserRoleMutation()

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

        {!!currentUser && user.id !== currentUser.id ? (
          <>
            {!isDm && (
              <ContextMenuItem
                onClick={() => push(`/dm/@${user.username}`)}
                label={t('user.context.sendMessage')}
              />
            )}
          </>
        ) : (
          <></>
        )}
        {!!server && canManageUsers && (
          <>
            <ContextMenuItem label="Set Role">
              {server.roles.map(r => (
                <ContextMenuItem
                  key={r.id}
                  checked={role && role.id === r.id}
                  label={
                    <div className="flex items-center ">
                      <div
                        className={`w-3 h-3 rounded-full mr-2.5 ${
                          r.color ? '' : 'dark:bg-gray-700'
                        }`}
                        style={{ backgroundColor: r.color }}
                      />
                      {r.name}
                    </div>
                  }
                  onClick={() => {
                    setUserRole({
                      variables: {
                        input: {
                          userId: user.id,
                          roleId: r.id
                        }
                      }
                    })
                  }}
                />
              ))}
            </ContextMenuItem>

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
                const confirmed = window.confirm(`Are you sure you want to ban ${user.username} from +${server.name}?`)
                if (!confirmed) return
                banUser({
                  variables: {
                    input: {
                      serverId: server.id,
                      userId: user.id
                    }
                  }
                })
                toast.success(`Banned ${user.username} from +${server.name}!`)
              }}
            />

            {currentUser.isAdmin && (
              <ContextMenuItem label={`Global ban ${user.username}`}
                               red
                               onClick={() => {
                                 const confirmed = window.confirm(`Are you sure you want to global ban ${user.username}?`)
                                 if (!confirmed) return
                                 banUser({
                                   variables: {
                                     input: {
                                       serverId: server.id,
                                       userId: user.id
                                     }
                                   }
                                 })
                                 toast.success(`Global banned ${user.username}!`)
                               }}
              />
            )}
          </>
        )}
      </ContextMenuSection>
    </>
  )
}
