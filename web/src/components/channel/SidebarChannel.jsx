import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import { IconChannel, IconSettings } from '@/components/ui/icons/Icons'
import { useTranslation } from 'react-i18next'
import Tippy from '@tippyjs/react'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/types/ServerPermission'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'

export default function SidebarChannel({ channel, serverId }) {
  const { t } = useTranslation()

  const [canManageChannels] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.ManageChannels]
  })

  return (
    <ContextMenuTrigger
      data={{ type: ContextMenuType.Channel, channel: channel }}
    >
      <SidebarItem to={`/server/${serverId}/channel/${channel.id}`}>
        <IconChannel className="w-5 h-5 mr-3" />
        {channel.name}
        {canManageChannels && (
          <Tippy content={t('channel.edit')}>
            <div className="group-hover:opacity-100 opacity-0 ml-auto">
              <IconSettings className="w-4 h-4 text-tertiary" />
            </div>
          </Tippy>
        )}
      </SidebarItem>
    </ContextMenuTrigger>
  )
}
