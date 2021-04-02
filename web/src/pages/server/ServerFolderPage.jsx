import ServerFoldersSidebar from '@/pages/server/ServerFoldersSidebar'
import { useParams } from 'react-router-dom'
import { useSetServerPage } from '@/hooks/useSetServerPage'

export default function ServerFolderPage() {
  const { serverId, folderId } = useParams()
  useSetServerPage(`folder/${folderId}`)

  return (
    <>
      <ServerFoldersSidebar serverId={serverId} />
    </>
  )
}
