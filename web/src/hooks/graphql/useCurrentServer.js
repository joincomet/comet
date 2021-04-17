import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import { GET_JOINED_SERVERS } from '@/graphql/queries'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export const useCurrentServer = () => {
  const { serverId } = useParams()
  const [user] = useCurrentUser()
  const [{ data, fetching }] = useQuery({
    query: GET_JOINED_SERVERS,
    variables: { id: user?.id },
    pause: !user
  })
  const server = data?.getJoinedServers.find(server => server.id === serverId)
  return [server, !server && fetching]
}
