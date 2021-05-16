import Sidebar from '@/components/ui/sidebar/Sidebar'
import { useStore } from '@/hooks/useStore'
import SidebarFolder from '@/components/folder/SidebarFolder'
import CreateFolder from '@/components/folder/CreateFolder'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export default function ServerFoldersSidebar({ server }) {
  const [currentUser] = useCurrentUser()
  const userFolders = currentUser?.folders ?? []
  const serverFolders = server?.folders ?? []
  const showFolders = useStore(s => s.showFolders)

  return (
    <Sidebar right show={showFolders}>
      <div className="px-1.5">
        <CreateFolder server={server} />
        {serverFolders.length > 0 && (
          <div className="space-y-0.5">
            {!!serverFolders &&
              serverFolders.map(folder => (
                <SidebarFolder
                  key={folder.id}
                  folder={folder}
                  server={server}
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
