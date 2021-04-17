import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarSortButtons from '@/components/ui/sidebar/SidebarSortButtons'
import { IconChevronDown, IconUsers } from '@/components/ui/icons/Icons'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import { useTranslation } from 'react-i18next'
import { useCurrentServer } from '@/hooks/graphql/useCurrentServer'
import SidebarChannel from '@/components/channel/SidebarChannel'
import CreateChannel from '@/components/channel/CreateChannel'

export default function ServerSidebar() {
  const { t } = useTranslation()
  const [server] = useCurrentServer()

  return (
    <Sidebar>
      <div className="h-12 border-b dark:border-gray-850 flex items-center justify-between px-5 text-base font-medium">
        {server.name}
        <IconChevronDown className="w-5 h-5" />
      </div>

      <div className="px-1.5 pt-4">
        <SidebarItem>
          <IconUsers className="mr-3 w-5 h-5" />
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
