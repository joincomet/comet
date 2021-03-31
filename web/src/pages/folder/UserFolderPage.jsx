import FoldersSidebar from '@/components/sidebars/FoldersSidebar'
import Container from '@/components/Container'
import Posts from '@/components/post/Posts'
import { useParams } from 'react-router-dom'
import Header from '@/components/headers/base/Header'
import { useUserFolders } from '@/components/providers/DataProvider'
import { IconFolder } from '@/lib/Icons'
import ShowFoldersButton from '@/components/headers/base/ShowFoldersButton'
import { useStore } from '@/lib/stores/useStore'

export default function UserFolderPage() {
  const { folderId } = useParams()
  const { showFolders } = useStore()

  const folder = useUserFolders().find(f => f.id === folderId)

  return (
    <>
      <FoldersSidebar show={showFolders} />

      <Header title={folder.name} icon={<IconFolder className="w-5 h-5" />}>
        <div className="ml-auto">
          <ShowFoldersButton />
        </div>
      </Header>

      <Container rightSidebar={showFolders}>
        <Posts showServerName variables={{ folderId }} />
      </Container>
    </>
  )
}
