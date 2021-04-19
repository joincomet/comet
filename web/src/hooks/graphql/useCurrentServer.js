import { useParams } from 'react-router-dom'
import { useJoinedServers } from '@/hooks/graphql/useJoinedServers'

export const useCurrentServer = () => {
  const { serverId } = useParams()
  const servers = useJoinedServers()
  return servers.find(server => server.id === serverId)
}
