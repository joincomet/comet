import { IconChannel } from '@/components/ui/icons/Icons'
import ShowUsersButton from '@/components/ui/header/buttons/ShowUsersButton'
import Header from '@/components/ui/header/Header'

export default function ChannelHeader({ channel }) {
  return (
    <Header
      icon={<IconChannel className="w-5 h-5" />}
      title={`${channel?.name ?? ''}`}
    >
      <div className="ml-auto pl-6">
        <ShowUsersButton />
      </div>
    </Header>
  )
}
