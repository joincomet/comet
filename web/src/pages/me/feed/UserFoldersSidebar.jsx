import { useDrop } from 'react-dnd'
import { DragItemTypes } from '@/types/DragItemTypes'
import toast from 'react-hot-toast'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import {
  IconFavoritesFolder,
  IconFolder,
  IconReadLaterFolder
} from '@/components/ui/icons/Icons'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks/useStore'
import { useUserFolders } from '@/hooks/useUserFolders'

export default function UserFoldersSidebar() {
  const { t } = useTranslation()
  const { showFolders } = useStore()
  const userFolders = useUserFolders()

  return (
    <Sidebar right show={showFolders}>
      <div className="px-1.5">
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
