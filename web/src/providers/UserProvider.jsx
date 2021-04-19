import { createContext } from 'react'
import { useCurrentUserQuery } from '@/graphql/hooks'

export const UserContext = createContext({ user: null, loading: true })

export function UserProvider({ children }) {
  const { data, loading } = useCurrentUserQuery()
  return (
    <UserContext.Provider
      value={{
        user: data?.user,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
