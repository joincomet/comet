import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarUser from '@/components/ui/sidebar/SidebarUser'
import { useMemo, useRef } from 'react'
import { useStore } from '@/hooks/useStore'
import { useChannelUsersQuery } from '@/graphql/hooks'
import { Virtuoso } from 'react-virtuoso'
import { useCurrentServer } from '@/hooks/graphql/useCurrentServer'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'

export default function ChannelUsersSidebar({ channel }) {
  const server = useCurrentServer()

  const { data } = useChannelUsersQuery({
    variables: { channelId: channel?.id },
    skip: !channel
  })

  const users = data?.channelUsers ?? []

  const items = useMemo(() => {
    const temp = []
    for (const role of server.roles) {
      const roleUsers = users.filter(
        user =>
          user.isOnline &&
          user.roles.map(r => r.id).includes(role.id) &&
          !temp.includes(user)
      )
      if (!roleUsers.length) continue
      temp.push(`${role.name} — ${roleUsers.length}`)
      temp.push(...roleUsers)
    }
    const offlineUsers = users.filter(user => !user.isOnline)
    if (offlineUsers.length) {
      temp.push(`Offline — ${offlineUsers.length}`)
      temp.push(...offlineUsers)
    }
    return temp
  }, [users, server.roles])

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
                  nickname={user.nickname}
                  roles={user.roles}
                  color={user.color}
                />
              </div>
            )}
          </div>
        )}
      />
    </Sidebar>
  )
}
