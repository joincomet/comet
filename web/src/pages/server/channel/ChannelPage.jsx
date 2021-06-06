import ChannelUsersSidebar from '@/pages/server/channel/ChannelUsersSidebar'
import Messages from '@/components/message/Messages'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import ChannelHeader from '@/pages/server/channel/ChannelHeader'
import { Helmet } from 'react-helmet-async'
import { useCurrentServer } from '@/hooks/graphql/useCurrentServer'

export default function ChannelPage({ channelName }) {
  const { server, users: serverUsers } = useCurrentServer()
  const channel = (server?.channels ?? []).find(c => c.name === channelName)
  useSetServerPage(channel ? `/#${channelName}` : null)
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
      <Helmet>
        <title>
          {!!channel && !!server
            ? `#${channel?.name} – ${server?.displayName}`
            : null}
        </title>
      </Helmet>
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
