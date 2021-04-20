import { createContext } from 'react'
import { useCurrentUserQuery } from '@/graphql/hooks'

export const UserContext = createContext({ user: null, loading: true })

export function UserProvider({ children }) {
  const { data, loading } = useCurrentUserQuery()
  const user = data?.user
  return (
    <UserContext.Provider
      value={{
        user,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
