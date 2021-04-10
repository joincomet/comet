import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import { IconChannel, IconSettings } from '@/components/ui/icons/Icons'
import { useTranslation } from 'react-i18next'
import Tippy from '@tippyjs/react'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/types/ServerPermission'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import CountBadge from '@/components/ui/CountBadge'
import { useLocation } from 'react-router-dom'

export default function SidebarChannel({ channel, serverId }) {
  const { t } = useTranslation()

  const [canManageChannels] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.ManageChannels]
  })

  const { pathname } = useLocation()
  const to = `/server/${serverId}/channel/${channel.id}`
  const active = pathname === to

  return (
    <ContextMenuTrigger
      data={{ type: ContextMenuType.Channel, channel: channel }}
    >
      <SidebarItem to={to}>
        {channel.isUnread && !active && (
          <div className="absolute -left-1.5 top-1/2 transform -translate-y-1/2 rounded-r-full dark:bg-gray-100 h-2 w-1" />
        )}

        <IconChannel className={`w-5 h-5 mr-3`} />
        <span className={`${channel.isUnread ? 'text-primary' : ''}`}>
          {channel.name}
        </span>

        <div className="ml-auto" />
        {!!channel.mentionCount && (
          <div className="pr-2">
            <CountBadge count={channel.mentionCount} />
          </div>
        )}
        {canManageChannels && (
          <Tippy content={t('channel.edit')}>
            <div className="group-hover:visible invisible">
              <IconSettings className="w-4 h-4 text-tertiary" />
            </div>
          </Tippy>
        )}
      </SidebarItem>
    </ContextMenuTrigger>
  )
}
