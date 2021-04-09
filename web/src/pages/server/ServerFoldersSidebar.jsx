import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import { useTranslation } from 'react-i18next'
import { ServerPermission } from '@/types/ServerPermission'
import { useStore } from '@/hooks/useStore'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { useUserFolders } from '@/providers/DataProvider'
import { useServerFolders } from '@/providers/ServerProvider'
import SidebarFolder from '@/components/folder/SidebarFolder'
import CreateFolder from '@/components/folder/CreateFolder'

export default function ServerFoldersSidebar({ serverId }) {
  const userFolders = useUserFolders()
  const serverFolders = useServerFolders(serverId)

  const [canManageFolders] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.ManagePosts]
  })

  const { t } = useTranslation()
  const showFolders = useStore(s => s.showFolders)

  return (
    <Sidebar right show={showFolders}>
      <div className="px-1.5">
        <CreateFolder serverId={serverId} />
        {serverFolders.length > 0 && (
          <div className="space-y-0.5">
            {!!serverFolders &&
              serverFolders.map(folder => (
                <SidebarFolder
                  key={folder.id}
                  folder={folder}
                  serverId={serverId}
                />
              ))}
          </div>
        )}

        <CreateFolder />

        <div className="space-y-0.5">
          {userFolders.map(folder => (
            <SidebarFolder key={folder.id} folder={folder} />
          ))}
        </div>
      </div>
    </Sidebar>
  )
}
