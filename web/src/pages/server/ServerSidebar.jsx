import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarSortButtons from '@/components/ui/sidebar/SidebarSortButtons'
import {
  IconChevronDown,
  IconHub,
  IconSettings,
  IconUserAdd,
  IconUsers
} from '@/components/ui/icons/Icons'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import { useTranslation } from 'react-i18next'
import { useCurrentServer } from '@/hooks/graphql/useCurrentServer'
import SidebarChannel from '@/components/channel/SidebarChannel'
import CreateChannel from '@/components/channel/CreateChannel'

export default function ServerSidebar() {
  const { t } = useTranslation()
  const server = useCurrentServer()

  return (
    <Sidebar>
      <div className="h-20 relative bg-gradient-to-br from-red-400 to-indigo-600">
        <div className="absolute inset-0 flex pt-3 pl-4 pr-3 justify-between bg-gradient-to-b from-transparent to-gray-800 text-lg font-medium">
          {server.name}
          <button
            type="button"
            className="rounded-full cursor-pointer focus:outline-none h-7 w-7 flex items-center justify-center transition bg-opacity-0 hover:bg-opacity-25 bg-gray-800"
          >
            <IconSettings className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>

      <div className="px-1.5 pt-4">
        {/*<SidebarItem>
          <IconHub className="mr-3 w-5 h-5" />
          Hub
        </SidebarItem>*/}
        <SidebarItem>
          <IconUserAdd className="mr-3 w-5 h-5" />
          {t('server.invitePeople')}
        </SidebarItem>

        <SidebarLabel plusLabel="Create Post">{t('server.feed')}</SidebarLabel>

        <SidebarSortButtons />

        <CreateChannel serverId={server.id} />

        <div className="space-y-0.5">
          {server.channels.map(channel => (
            <SidebarChannel
              key={channel.id}
              channel={channel}
              serverId={server.id}
            />
          ))}
        </div>
      </div>
    </Sidebar>
  )
}
