import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export const useGroupsAndDms = () => {
  const [user] = useCurrentUser()
  const groups = user?.groups ?? []
  const dms = user?.relatedUsers?.filter(r => r.showChat) ?? []
  return groups
    .concat(dms)
    .sort(
      (a, b) =>
        (a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0) -
        (b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0)
    )
}
