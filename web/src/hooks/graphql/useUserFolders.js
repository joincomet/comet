import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export const useUserFolders = () => {
  const [user] = useCurrentUser()
  return user?.folders ?? []
}
