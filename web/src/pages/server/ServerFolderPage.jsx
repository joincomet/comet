import ServerFoldersSidebar from '@/pages/server/ServerFoldersSidebar'
import { useParams } from 'react-router-dom'

export default function ServerFolderPage() {
  const { serverId } = useParams()
  return (
    <>
      <ServerFoldersSidebar serverId={serverId} />
    </>
  )
}
