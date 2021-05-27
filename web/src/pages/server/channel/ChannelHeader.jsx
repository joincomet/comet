import { IconChannel } from '@/components/ui/icons/Icons'
import ShowUsersButton from '@/components/ui/header/buttons/ShowUsersButton'
import Header from '@/components/ui/header/Header'

export default function ChannelHeader({ channel }) {
  return (
    <Header
      showDivider={!!channel?.description}
      icon={<IconChannel className="w-5 h-5" />}
      title={`${channel?.name ?? ''}`}
    >
      {channel?.description && (
        <div className="text-13 text-tertiary font-medium leading-5 truncate">
          {channel?.description}
        </div>
      )}

      <div className="ml-auto pl-6 flex items-center space-x-5">
        <ShowUsersButton />
      </div>
    </Header>
  )
}
