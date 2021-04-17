import { useQuery } from 'urql'
import { GET_CURRENT_USER } from '@/graphql/queries'

export const useCurrentUser = () => {
  const [{ data, fetching }] = useQuery({ query: GET_CURRENT_USER })
  const user = data?.getCurrentUser
  return [user, fetching && !user]
}
