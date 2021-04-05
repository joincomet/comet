import ServerFoldersSidebar from '@/pages/server/ServerFoldersSidebar'
import { useParams } from 'react-router-dom'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import Posts from '@/components/post/Posts'

export default function ServerFolderPage() {
  const { serverId, folderId } = useParams()
  useSetServerPage(`folder/${folderId}`)

  return (
    <Page rightSidebar={<ServerFoldersSidebar serverId={serverId} />}>
      <Posts folderId={folderId} />
    </Page>
  )
}
