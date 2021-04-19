import { useContext } from 'react'
import { UserContext } from '@/providers/UserProvider'
import { useCurrentUserQuery } from '@/graphql/hooks'

export const useCurrentUser = () => {
  // const { user, loading } = useContext(UserContext)
  // return [user, loading && !user]
  const { data, loading } = useCurrentUserQuery()
  const user = data?.user
  return [user, loading && !user]
}
