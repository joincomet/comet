import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export const useJoinedServers = () => {
  const [user] = useCurrentUser()
  return user?.servers.map(s => s.server) ?? []
}
