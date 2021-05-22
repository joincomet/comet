import ChannelUsersSidebar from '@/pages/server/channel/ChannelUsersSidebar'
import Messages from '@/components/message/Messages'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import ChannelHeader from '@/pages/server/channel/ChannelHeader'
import { useReadChannelMutation, useServerUsersQuery } from '@/graphql/hooks'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useCurrentServer } from '@/hooks/graphql/useCurrentServer'
import { usePrevious } from 'react-use'
import { Redirect } from 'react-router-dom'

export default function ChannelPage({ channelName }) {
  const { server, users: serverUsers } = useCurrentServer()
  const channel = (server?.channels ?? []).find(c => c.name === channelName)
  useSetServerPage(`channel/${channel?.id}`)
  const [readChannel] = useReadChannelMutation()
  const [currentUser] = useCurrentUser()
  const [hasRead, setHasRead] = useState(false)
  const previousChannel = usePrevious(channel)
  useEffect(() => {
    if (channel && previousChannel && channel.id !== previousChannel.id) {
      setHasRead(false)
    }
  }, [channel, previousChannel])
  useEffect(() => {
    if (currentUser && channel && channel.isUnread && !hasRead) {
      setHasRead(true)
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

  if (!!server && !channel) return <Redirect to={`/+${server.name}`} />

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
