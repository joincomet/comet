import { useParams } from 'react-router-dom'
import ChannelUsersSidebar from '@/pages/server/channel/ChannelUsersSidebar'
import Messages from '@/components/message/Messages'
import { useServerChannels } from '@/providers/ServerProvider'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import ChannelHeader from '@/pages/server/channel/ChannelHeader'

export default function ChannelPage() {
  const { channelId } = useParams()
  const channels = useServerChannels()
  const channel = channels.find(c => c.id === channelId)
  useSetServerPage(`channel/${channelId}`)

  return (
    <Page
      header={<ChannelHeader channel={channel} />}
      rightSidebar={<ChannelUsersSidebar channel={channel} />}
    >
      <Messages channel={channel} />
    </Page>
  )
}
