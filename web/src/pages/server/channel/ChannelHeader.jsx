import { IconChannel } from '@/components/ui/icons/Icons'
import ShowUsersButton from '@/components/ui/header/buttons/ShowUsersButton'
import Header from '@/components/ui/header/Header'
import PinnedMessagesButton from '@/components/ui/header/buttons/PinnedMessagesButton'

export default function ChannelHeader({ channel }) {
  return (
    <Header
      icon={<IconChannel className="w-5 h-5" />}
      title={`${channel?.name ?? ''}`}
    >
      <div className="ml-auto pl-6 flex items-center space-x-5">
        <PinnedMessagesButton />
        <ShowUsersButton />
      </div>
    </Header>
  )
}
