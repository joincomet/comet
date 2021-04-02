import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import { useQuery } from 'urql'
import { GET_CHANNEL_USERS } from '@/graphql/queries'
import SidebarUser from '@/components/ui/sidebar/SidebarUser'
import { useVirtual } from 'react-virtual'
import { useCallback, useRef } from 'react'
import { useStore } from '@/hooks/useStore'

export default function ChannelUsersSidebar({ channel }) {
  const [{ data }] = useQuery({
    query: GET_CHANNEL_USERS,
    variables: { channelId: channel?.id },
    pause: !channel
  })

  const roles = data?.getChannelUsers ?? []

  const parentRef = useRef()

  const items = []

  for (const role of roles) {
    items.push(role.role)
    items.push(...role.users)
  }

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize: useCallback(
      i => (typeof items[i] === 'string' ? 36 : 46),
      []
    ),
    overscan: 10
  })

  const userCount = useCallback(
    roleName => roles.find(role => role.role === roleName).users.length,
    [roles]
  )

  const { showUsers } = useStore()

  return (
    <Sidebar right show={showUsers}>
      <div
        className="px-1.5 scrollbar-dark"
        ref={parentRef}
        style={{
          height: `100%`,
          width: `100%`
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`
          }}
          className="relative w-full"
        >
          {rowVirtualizer.virtualItems.map(virtualRow => {
            const item = items[virtualRow.index]

            return (
              <div
                key={virtualRow.index}
                className="absolute top-0 left-0 w-full h-auto"
                style={{
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                {typeof item === 'string' ? (
                  <SidebarLabel>
                    {item} — {userCount(item)}
                  </SidebarLabel>
                ) : (
                  <div className="pb-0.5">
                    <SidebarUser user={item} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Sidebar>
  )
}
