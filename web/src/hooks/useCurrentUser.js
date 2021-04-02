import { useCurrentUserQuery } from '@/graphql/queries'

export const useCurrentUser = () => {
  const [{ data }] = useCurrentUserQuery()
  return data?.getCurrentUser
}
