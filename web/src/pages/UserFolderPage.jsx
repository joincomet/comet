import UserFoldersSidebar from '@/pages/feed/UserFoldersSidebar'
import Posts from '@/components/post/Posts'
import { useStore } from '@/hooks/useStore'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'
import FolderInfoCard from '@/components/folder/FolderInfoCard'
import FolderHeader from '@/components/folder/FolderHeader'
import { useFolderQuery } from '@/graphql/hooks'

export default function UserFolderPage({ folderId }) {
  const showFolders = useStore(s => s.showFolders)

  const { data } = useFolderQuery({
    variables: { id: folderId },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  })
  const folder = data?.folder

  useSetHomePage(`folder/${folderId}`)

  return (
    <Page
      rightSidebar={<UserFoldersSidebar show={showFolders} />}
      header={<FolderHeader folder={folder} />}
    >
      <Posts
        showServerName
        folderId={folderId}
        header={<FolderInfoCard folder={folder} />}
      />
    </Page>
  )
}
