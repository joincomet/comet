import ServerFoldersSidebar from '@/pages/server/ServerFoldersSidebar'
import { useParams } from 'react-router-dom'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import Posts from '@/components/post/Posts'
import FolderInfoCard from '@/components/folder/FolderInfoCard'
import FolderHeader from '@/components/folder/FolderHeader'
import { useFolderQuery } from '@/graphql/hooks'

export default function ServerFolderPage() {
  const { serverId, folderId } = useParams()
  useSetServerPage(`folder/${folderId}`)

  const { data } = useFolderQuery({
    variables: { id: folderId },
    skip: !folderId
  })
  const folder = data?.folder

  return (
    <Page
      rightSidebar={<ServerFoldersSidebar serverId={serverId} />}
      header={<FolderHeader folder={folder} />}
    >
      <Posts folderId={folderId} header={<FolderInfoCard folder={folder} />} />
    </Page>
  )
}
