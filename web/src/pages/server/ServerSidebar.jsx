import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarSortButtons from '@/components/ui/sidebar/SidebarSortButtons'
import { IconSettings, IconShield } from '@/components/ui/icons/Icons'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import { useTranslation } from 'react-i18next'
import SidebarChannel from '@/components/channel/SidebarChannel'
import CreateChannel from '@/components/channel/CreateChannel'
import { ServerPermission, ChannelType } from '@/graphql/hooks'
import { useState } from 'react'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import CreateServerDialog from '@/components/server/create/CreateServerDialog'
import { VectorLogo } from '@/components/ui/vectors'

export default function ServerSidebar({ server }) {
  const [editOpen, setEditOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [canManageServer, canViewPrivateChannels] = useHasServerPermissions({
    server,
    permissions: [
      ServerPermission.ManageServer,
      ServerPermission.PrivateChannels
    ]
  })

  return (
    <>
      {!!server && (
        <CreateServerDialog
          open={editOpen}
          setOpen={setEditOpen}
          server={server}
        />
      )}

      <Sidebar>
        {server?.bannerUrl ? (
          <div
            className={`h-20 relative bg-center bg-cover bg-no-repeat ${
              server?.bannerUrl
                ? ''
                : 'bg-gradient-to-br from-red-400 to-indigo-600'
            }`}
            style={
              server?.bannerUrl
                ? { backgroundImage: `url(${server?.bannerUrl})` }
                : {}
            }
          />
        ) : (
          <div className="h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium">
            <VectorLogo className="h-4" />
          </div>
        )}

        <div className="px-1.5 pt-4">
          <div className="font-semibold text-lg px-3 text-primary">
            {server?.displayName}
          </div>

          <SidebarLabel plusLabel="Create Post">Posts</SidebarLabel>

          <SidebarSortButtons />

          <CreateChannel server={server} />

          <div className="space-y-0.5">
            {server?.channels
              .filter(channel =>
                channel.type === ChannelType.Private
                  ? canViewPrivateChannels
                  : true
              )
              .map(channel => (
                <SidebarChannel
                  key={channel.id}
                  channel={channel}
                  server={server}
                />
              ))}
          </div>

          {canManageServer && (
            <>
              <SidebarLabel>Admin</SidebarLabel>
              <div className="space-y-0.5">
                <SidebarItem onClick={() => setEditOpen(true)}>
                  <IconSettings className="mr-3 w-5 h-5" />
                  Edit Planet
                </SidebarItem>
                <SidebarItem>
                  <IconShield className="mr-3 w-5 h-5" />
                  Manage Roles
                </SidebarItem>
              </div>
            </>
          )}
        </div>
      </Sidebar>
    </>
  )
}
