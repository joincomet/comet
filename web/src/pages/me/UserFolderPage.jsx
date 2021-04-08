import UserFoldersSidebar from '@/pages/me/feed/UserFoldersSidebar'
import Posts from '@/components/post/Posts'
import { useParams } from 'react-router-dom'
import { useStore } from '@/hooks/useStore'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'urql'
import { GET_FOLDER } from '@/graphql/queries'
import FolderInfoCard from '@/components/folder/FolderInfoCard'
import FolderHeader from '@/components/folder/FolderHeader'

export default function UserFolderPage() {
  const { t } = useTranslation()
  const { folderId } = useParams()
  const showFolders = useStore(s => s.showFolders)

  const [{ data }] = useQuery({ query: GET_FOLDER, variables: { folderId } })
  const folder = data?.getFolder

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
