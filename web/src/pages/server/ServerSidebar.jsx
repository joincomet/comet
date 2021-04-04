import { useEffect, useState } from 'react'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarSortButtons from '@/components/ui/sidebar/SidebarSortButtons'
import { useHistory } from 'react-router-dom'
import {
  IconChevronDown,
  IconChannel,
  IconUsers,
  IconSettings
} from '@/components/ui/icons/Icons'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/dialog/Dialog'
import { CREATE_CHANNEL } from '@/graphql/mutations/channel'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import { ServerPermission } from '@/types/ServerPermission'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'
import Switch from '@/components/ui/Switch'
import DialogTitle from '@/components/ui/dialog/DialogTitle'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useServer, useServerChannels } from '@/providers/ServerProvider'
import { useMutation } from 'urql'
import SidebarChannel from '@/components/channel/SidebarChannel'
import CreateChannel from '@/components/channel/CreateChannel'
import ChannelContextMenuWrapper from '@/components/channel/ChannelContextMenuWrapper'

export default function ServerSidebar() {
  const { t } = useTranslation()
  const server = useServer()
  const channels = useServerChannels()

  return (
    <Sidebar>
      <ChannelContextMenuWrapper />

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
          {channels.map(channel => (
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
