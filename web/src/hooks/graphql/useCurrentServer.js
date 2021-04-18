import { useParams } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export const useCurrentServer = () => {
  const { serverId } = useParams()
  const [user] = useCurrentUser()
  return user?.servers.find(server => server.id === serverId)
}
