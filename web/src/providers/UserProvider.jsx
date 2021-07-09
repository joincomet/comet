import { createContext } from 'react'
import { useCurrentUserQuery } from '@/graphql/hooks'
import { wsStatus } from '@/graphql/WebSocketLink'

export const UserContext = createContext({ user: null, loading: true })

export default function UserProvider({ children }) {
  const { data, loading } = useCurrentUserQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  })
  const user = data?.user
  return (
    <UserContext.Provider
      value={{
        user,
        loading: (loading || wsStatus.status !== 'connected') && !user
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
