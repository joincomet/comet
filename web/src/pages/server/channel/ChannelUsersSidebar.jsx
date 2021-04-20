import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarUser from '@/components/ui/sidebar/SidebarUser'
import { useRef } from 'react'
import { useStore } from '@/hooks/useStore'
import { useChannelUsersQuery } from '@/graphql/hooks'
import { Virtuoso } from 'react-virtuoso'

export default function ChannelUsersSidebar({ channel }) {
  const { data } = useChannelUsersQuery({
    variables: { channelId: channel?.id },
    skip: !channel
  })

  const users = data?.channelUsers ?? []

  const virtusoRef = useRef()

  const showUsers = useStore(s => s.showUsers)

  return (
    <Sidebar right show={showUsers}>
      <Virtuoso
        className="px-1.5 scrollbar-dark"
        ref={virtusoRef}
        style={{
          height: `100%`,
          width: `100%`
        }}
        data={{ users }}
        itemContent={(index, data) => (
          <div className="pb-0.5">
            <SidebarUser user={data.user} name={data.name} roles={data.roles} />
          </div>
        )}
      />
    </Sidebar>
  )
}
