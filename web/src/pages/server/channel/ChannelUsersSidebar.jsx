import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import SidebarUser from '@/components/ui/sidebar/SidebarUser'
import { useVirtual } from 'react-virtual'
import { useCallback, useRef } from 'react'
import { useStore } from '@/hooks/useStore'
import { useChannelUsersQuery } from '@/graphql/hooks'

export default function ChannelUsersSidebar({ channel }) {
  const { data } = useChannelUsersQuery({
    variables: { channelId: channel?.id },
    skip: !channel
  })

  const users = data?.channelUsers ?? []

  const parentRef = useRef()

  const rowVirtualizer = useVirtual({
    size: users.length,
    parentRef,
    estimateSize: useCallback(i => 46, []),
    overscan: 10
  })

  const showUsers = useStore(s => s.showUsers)

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
            const item = users[virtualRow.index]

            return (
              <div
                key={virtualRow.index}
                className="absolute top-0 left-0 w-full h-auto"
                style={{
                  transform: `translateY(${virtualRow.start}px)`
                }}
              >
                <div className="pb-0.5">
                  <SidebarUser user={item} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Sidebar>
  )
}
