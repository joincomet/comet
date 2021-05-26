import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarUser from '@/components/ui/sidebar/SidebarUser'
import { useMemo, useRef } from 'react'
import { useStore } from '@/hooks/useStore'
import { ServerPermission } from '@/graphql/hooks'
import { Virtuoso } from 'react-virtuoso'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'

export default function ChannelUsersSidebar({ server, serverUsers }) {
  const items = useMemo(() => {
    const temp = []
    for (const role of (server?.roles ?? []).filter(r =>
      r.permissions.includes(ServerPermission.DisplayRoleSeparately)
    )) {
      const roleUsers = serverUsers.filter(
        user =>
          user.isOnline &&
          user.roles.map(r => r.id).includes(role.id) &&
          !temp.includes(user)
      )
      if (!roleUsers.length) continue
      temp.push(`${role.name} — ${roleUsers.length}`)
      temp.push(...roleUsers)
    }
    const onlineUsers = serverUsers.filter(
      serverUser => serverUser.user.isOnline
    )
    if (onlineUsers.length) {
      temp.push(`Online — ${onlineUsers.length}`)
      temp.push(...onlineUsers)
    }

    const offlineUsers = serverUsers.filter(
      serverUser => !serverUser.user.isOnline
    )
    if (offlineUsers.length) {
      temp.push(`Offline — ${offlineUsers.length}`)
      temp.push(...offlineUsers)
    }
    return temp
  }, [serverUsers, server])

  const virtusoRef = useRef()

  const showUsers = useStore(s => s.showUsers)

  return (
    <Sidebar right show={showUsers}>
      <Virtuoso
        className="scrollbar-dark"
        ref={virtusoRef}
        style={{
          height: `100%`,
          width: `100%`
        }}
        data={items}
        itemContent={(index, user) => (
          <div className="px-1.5 pb-0.5">
            {typeof user === 'string' ? (
              <SidebarLabel>{user}</SidebarLabel>
            ) : (
              <div className={`${user.user.isOnline ? '' : 'opacity-35'}`}>
                <SidebarUser
                  user={user.user}
                  role={user.role}
                  server={server}
                />
              </div>
            )}
          </div>
        )}
      />
    </Sidebar>
  )
}
