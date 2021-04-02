import { useParams } from 'react-router-dom'
import Header from '@/components/ui/header/Header'
import ChannelUsersSidebar from '@/pages/server/channel/ChannelUsersSidebar'
import Container from '@/components/ui/Container'
import { IconChannel } from '@/components/ui/icons/Icons'
import Messages from '@/components/message/Messages'
import { useStore } from '@/hooks/useStore'
import ShowUsersButton from '@/components/ui/header/buttons/ShowUsersButton'
import { useServerChannels } from '@/providers/ServerProvider'
import { useSetServerPage } from '@/hooks/useSetServerPage'

export default function ServerChannelPage() {
  const showUsers = useStore(s => s.showUsers)
  const { channelId } = useParams()
  const channels = useServerChannels()
  const channel = channels.find(c => c.id === channelId)
  useSetServerPage(`channel/${channelId}`)

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
      <ChannelUsersSidebar channel={channel} />
      <Container rightSidebar={showUsers}>
        <Messages channel={channel} />
      </Container>
    </>
  )
}
