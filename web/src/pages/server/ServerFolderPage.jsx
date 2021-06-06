import ServerFoldersSidebar from '@/pages/server/ServerFoldersSidebar'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import Posts from '@/components/post/Posts'
import FolderInfoCard from '@/components/folder/FolderInfoCard'
import FolderHeader from '@/components/folder/FolderHeader'

export default function ServerFolderPage({ server, folder }) {
  useSetServerPage(folder ? `/folder/${folder.id}` : null)

  return (
    <Page
      rightSidebar={<ServerFoldersSidebar server={server} />}
      header={<FolderHeader folder={folder} />}
    >
      <Posts folderId={folder.id} header={<FolderInfoCard folder={folder} />} />
    </Page>
  )
}
