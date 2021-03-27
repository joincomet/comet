import React, { useEffect, useRef } from 'react'
import ServerSidebar from '@/components/sidebars/ServerSidebar'
import SendMessageBar from '@/components/message/SendMessageBar'
import Header from '@/components/headers/base/Header'
import ChannelSidebar from '@/components/sidebars/ChannelUsersSidebar'
import {
  useChannel,
  useServer
} from '@/components/providers/ServerDataProvider'
import Container from '@/components/Container'
import View from '@/components/View'
import { IconChannel } from '@/lib/Icons'
import Messages from '@/components/message/Messages'

export default function ChannelPage() {
  const server = useServer()
  const channel = useChannel()

  return (
    <>
      <Header
        icon={<IconChannel className="w-5 h-5" />}
        title={`${channel.name}`}
      />
      <ServerSidebar server={server} />
      <ChannelSidebar server={server} />
      <Container rightSidebar>
        <View chatBar>
          <Messages variables={{ channelId: channel.id }} />
        </View>

        <SendMessageBar channel={channel} />
      </Container>
    </>
  )
}
