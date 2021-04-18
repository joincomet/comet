import Sidebar from '@/components/ui/sidebar/Sidebar'
import { useTranslation } from 'react-i18next'
import { useStore } from '@/hooks/useStore'
import SidebarFolder from '@/components/folder/SidebarFolder'
import CreateFolder from '@/components/folder/CreateFolder'
import { useUserFolders } from '@/hooks/graphql/useUserFolders'

export default function UserFoldersSidebar() {
  const { t } = useTranslation()
  const showFolders = useStore(s => s.showFolders)
  const userFolders = useUserFolders()

  return (
    <Sidebar right show={showFolders}>
      <div className="px-1.5">
        <CreateFolder />

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
