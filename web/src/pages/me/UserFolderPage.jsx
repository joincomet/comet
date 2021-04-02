import UserFoldersSidebar from '@/pages/me/feed/UserFoldersSidebar'
import Container from '@/components/ui/Container'
import Posts from '@/components/post/Posts'
import { useParams } from 'react-router-dom'
import Header from '@/components/ui/header/Header'
import { IconFolder } from '@/components/ui/icons/Icons'
import ShowFoldersButton from '@/components/ui/header/buttons/ShowFoldersButton'
import { useStore } from '@/hooks/useStore'
import { useUserFolders } from '@/providers/DataProvider'
import { useSetHomePage } from '@/hooks/useSetHomePage'

export default function UserFolderPage() {
  const { folderId } = useParams()
  const showFolders = useStore(s => s.showFolders)

  const folder = useUserFolders().find(f => f.id === folderId)
  useSetHomePage(`folder/${folderId}`)

  return (
    <>
      <UserFoldersSidebar show={showFolders} />

      <Header title={folder.name} icon={<IconFolder className="w-5 h-5" />}>
        <div className="ml-auto">
          <ShowFoldersButton />
        </div>
      </Header>

      <Container rightSidebar={showFolders}>
        <Posts showServerName folderId={folderId} />
      </Container>
    </>
  )
}
