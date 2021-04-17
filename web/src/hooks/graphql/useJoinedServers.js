import { useQuery } from 'urql'
import { GET_JOINED_SERVERS } from '@/graphql/queries'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export const useJoinedServers = () => {
  const [user] = useCurrentUser()
  const [{ data, fetching }] = useQuery({
    query: GET_JOINED_SERVERS,
    variables: { id: user?.id },
    pause: !user
  })
  const servers = data?.getJoinedServers
  return [servers, !servers && fetching]
}
