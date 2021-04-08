import ServerFoldersSidebar from '@/pages/server/ServerFoldersSidebar'
import { useParams } from 'react-router-dom'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import Posts from '@/components/post/Posts'
import FolderInfoCard from '@/components/folder/FolderInfoCard'
import { useQuery } from 'urql'
import { GET_FOLDER } from '@/graphql/queries'
import FolderHeader from '@/components/folder/FolderHeader'

export default function ServerFolderPage() {
  const { serverId, folderId } = useParams()
  useSetServerPage(`folder/${folderId}`)

  const [{ data }] = useQuery({ query: GET_FOLDER, variables: { folderId } })
  const folder = data?.getFolder

  return (
    <Page
      rightSidebar={<ServerFoldersSidebar serverId={serverId} />}
      header={<FolderHeader folder={folder} />}
    >
      <Posts folderId={folderId} header={<FolderInfoCard folder={folder} />} />
    </Page>
  )
}
