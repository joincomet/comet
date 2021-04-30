import { useParams } from 'react-router-dom'
import ChannelUsersSidebar from '@/pages/server/channel/ChannelUsersSidebar'
import Messages from '@/components/message/Messages'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import ChannelHeader from '@/pages/server/channel/ChannelHeader'
import { useChannel } from '@/hooks/graphql/useChannel'
import { useServerUsersQuery } from '@/graphql/hooks'
import { useCurrentServer } from '@/hooks/graphql/useCurrentServer'

export default function ChannelPage() {
  const { channelId } = useParams()
  const server = useCurrentServer()
  const channel = useChannel(channelId)
  useSetServerPage(`channel/${channelId}`)
  const { data } = useServerUsersQuery({
    variables: { serverId: server?.id },
    skip: !server
  })
  const serverUsers = data?.serverUsers

  return (
    <Page
      header={<ChannelHeader channel={channel} />}
      rightSidebar={
        <ChannelUsersSidebar
          channel={channel}
          serverUsers={serverUsers ?? []}
          server={server}
        />
      }
    >
      {!!channel && <Messages channel={channel} serverUsers={serverUsers} />}
    </Page>
  )
}
