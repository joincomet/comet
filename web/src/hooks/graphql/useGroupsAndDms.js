import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export const useGroupsAndDms = () => {
  const [user] = useCurrentUser()
  const groups = user?.groups ?? []
  const dms = user?.relationships?.filter(r => r.showChat) ?? []
  return groups
    .concat(dms)
    .sort((a, b) => a.lastMessageAt.getTime() - b.lastMessageAt.getTime())
}
