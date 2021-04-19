import { useParams } from 'react-router-dom'
import ChannelUsersSidebar from '@/pages/server/channel/ChannelUsersSidebar'
import Messages from '@/components/message/Messages'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import ChannelHeader from '@/pages/server/channel/ChannelHeader'
import { useChannel } from '@/hooks/graphql/useChannel'

export default function ChannelPage() {
  const { channelId } = useParams()
  const channel = useChannel(channelId)
  useSetServerPage(`channel/${channelId}`)

  return (
    <Page
      header={<ChannelHeader channel={channel} />}
      rightSidebar={<ChannelUsersSidebar channel={channel} />}
    >
      {!!channel && <Messages channel={channel} />}
    </Page>
  )
}
