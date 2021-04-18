import { useCurrentUserQuery } from '@/graphql/hooks'

export const useCurrentUser = () => {
  const [{ data, fetching }] = useCurrentUserQuery()
  const user = data?.user
  return [user, fetching && !user]
}
