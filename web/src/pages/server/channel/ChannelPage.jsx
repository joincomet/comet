import ChannelUsersSidebar from '@/pages/server/channel/ChannelUsersSidebar'
import Messages from '@/components/message/Messages'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import ChannelHeader from '@/pages/server/channel/ChannelHeader'
import { useReadChannelMutation, useServerUsersQuery } from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

export default function ChannelPage({ server, channel }) {
  useSetServerPage(`channel/${channel?.id}`)
  const { data } = useServerUsersQuery({
    variables: { serverId: server?.id },
    skip: !server,
    fetchPolicy: 'cache-and-network'
  })
  const serverUsers = data?.serverUsers ?? []
  const [readChannel] = useReadChannelMutation()
  const [currentUser] = useCurrentUser()
  useEffect(() => {
    if (currentUser && channel && channel.isUnread) {
      readChannel({
        variables: { input: { channelId: channel.id } },
        optimisticResponse: {
          readChannel: {
            ...channel,
            isUnread: false
          }
        }
      })
    }
  }, [channel, currentUser])

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
        <title>{`#${channel?.name} – ${server?.displayName}`}</title>
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
