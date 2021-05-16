import ChannelUsersSidebar from '@/pages/server/channel/ChannelUsersSidebar'
import Messages from '@/components/message/Messages'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import ChannelHeader from '@/pages/server/channel/ChannelHeader'
import { useServerUsersQuery } from '@/graphql/hooks'

export default function ChannelPage({ server, channel }) {
  useSetServerPage(`channel/${channel?.id}`)
  const { data } = useServerUsersQuery({
    variables: { serverId: server?.id },
    skip: !server,
    fetchPolicy: 'cache-and-network'
  })
  const serverUsers = data?.serverUsers ?? []

  return (
    <Page
      header={<ChannelHeader channel={channel} />}
      rightSidebar={
        <ChannelUsersSidebar
          channel={channel}
          serverUsers={serverUsers}
          server={server}
        />
      }
    >
      {!!channel && (
        <Messages
          server={server}
          channel={channel}
          users={serverUsers.map(su => su.user)}
        />
      )}
    </Page>
  )
}
