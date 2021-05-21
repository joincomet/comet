import { useContext } from 'react'
import { UserContext } from '@/providers/UserProvider'

export const useCurrentUser = () => {
  const { user, loading } = useContext(UserContext)
  return [user, loading]
}
