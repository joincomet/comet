import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export const useGroup = groupId => {
  const [user] = useCurrentUser()
  return user.groups.find(g => g.id === groupId)
}
