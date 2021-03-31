import { useDrop } from 'react-dnd'
import { DragItemTypes } from '@/lib/DragItemTypes'
import toast from 'react-hot-toast'
import Sidebar from '@/components/sidebars/base/Sidebar'
import { useParams } from 'react-router-dom'
import { useUserFolders } from '@/components/providers/DataProvider'
import {
  IconFavoritesFolder,
  IconFolder,
  IconReadLaterFolder
} from '@/lib/Icons'
import SidebarItem from '@/components/sidebars/base/SidebarItem'
import { useServerFolders } from '@/components/providers/DataProvider'
import { useHasServerPermissions } from '@/lib/hasPermission'
import SidebarLabel from '@/components/sidebars/base/SidebarLabel'
import { useTranslation } from 'react-i18next'
import { ServerPermission } from '@/lib/ServerPermission'

export default function FoldersSidebar({ show, server }) {
  const { serverId } = useParams()
  const userFolders = useUserFolders()
  const serverFolders = useServerFolders()

  const [canManageFolders] = useHasServerPermissions(
    [ServerPermission.ManagePosts],
    server?.id
  )

  const { t } = useTranslation()

  return (
    <Sidebar right show={show}>
      <div className="px-1.5">
        {serverId && !!serverFolders.length && (
          <>
            {canManageFolders ? (
              <SidebarLabel
                plusLabel={t('folders.server.create')}
                onClick={() => {}}
              >
                Server Folders
              </SidebarLabel>
            ) : (
              <SidebarLabel>Server Folders</SidebarLabel>
            )}

            <div className="space-y-0.5">
              {serverFolders.map(folder => (
                <Folder key={folder.id} folder={folder} />
              ))}
            </div>
          </>
        )}

        <SidebarLabel plusLabel={t('folders.user.create')} onClick={() => {}}>
          Your Folders
        </SidebarLabel>

        <div className="space-y-0.5">
          {userFolders.map(folder => (
            <Folder key={folder.id} folder={folder} />
          ))}
        </div>
      </div>
    </Sidebar>
  )
}

function Folder({ folder }) {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: DragItemTypes.Post,
    drop: (item, monitor) => {
      toast.success(t('folders.added', { folder }))
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  const isActive = isOver && canDrop

  const { t } = useTranslation()

  const favorites = t('folders.favorites')
  const readLater = t('folders.readLater')

  return (
    <SidebarItem active={isActive} to={`/folder/${folder.id}`} ref={dropRef}>
      {folder.name === favorites && (
        <>
          <IconFavoritesFolder className="w-5 h-5 mr-3 text-yellow-500" />
          <span className="truncate">{favorites}</span>
        </>
      )}
      {folder.name === readLater && (
        <>
          <IconReadLaterFolder className="w-5 h-5 mr-3 text-blue-500" />
          <span className="truncate">{readLater}</span>
        </>
      )}
      {folder.name !== favorites && folder.name !== readLater && (
        <>
          <IconFolder className="w-5 h-5 mr-3" />
          <span className="truncate">{folder.name}</span>
        </>
      )}
    </SidebarItem>
  )
}
