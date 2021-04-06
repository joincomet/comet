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
import { useUserFolders } from '@/providers/DataProvider'
import SidebarFolder from '@/components/folder/SidebarFolder'

export default function UserFoldersSidebar() {
  const { t } = useTranslation()
  const showFolders = useStore(s => s.showFolders)
  const userFolders = useUserFolders()

  return (
    <Sidebar right show={showFolders}>
      <div className="px-1.5">
        <SidebarLabel plusLabel={t('folder.user.create')} onClick={() => {}}>
          Your Folders
        </SidebarLabel>

        <div className="space-y-0.5">
          {!!userFolders &&
            userFolders.map(folder => (
              <SidebarFolder key={folder.id} folder={folder} />
            ))}
        </div>
      </div>
    </Sidebar>
  )
}
