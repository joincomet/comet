import { useContext } from 'react'
import { UserContext } from '@/components/user/UserProvider'

export const useUser = () => {
  const { user } = useContext(UserContext)

  return {
    user
  }
}
