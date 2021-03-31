import ServerSidebar from '@/components/sidebars/ServerSidebar'
import Header from '@/components/headers/base/Header'
import ChannelUsersSidebar from '@/components/sidebars/ChannelUsersSidebar'
import { useChannel, useServer } from '@/components/providers/DataProvider'
import Container from '@/components/Container'
import { IconChannel } from '@/lib/Icons'
import Messages from '@/components/message/Messages'
import { useStore } from '@/lib/stores/useStore'
import ShowUsersButton from '@/components/headers/base/ShowUsersButton'

export default function ChannelPage() {
  const server = useServer()
  const channel = useChannel()
  const { showUsers } = useStore()

  return (
    <>
      <Header
        icon={<IconChannel className="w-5 h-5" />}
        title={`${channel?.name ?? ''}`}
      >
        <div className="ml-auto pl-6">
          <ShowUsersButton />
        </div>
      </Header>
      <ServerSidebar server={server} />
      <ChannelUsersSidebar channel={channel} show={showUsers} />
      <Container rightSidebar={showUsers}>
        <Messages channel={channel} />
      </Container>
    </>
  )
}
