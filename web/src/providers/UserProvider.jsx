import { createContext, useEffect } from 'react'
import { useCurrentUserQuery } from '@/graphql/hooks'
import * as Sentry from '@sentry/react'
import { wsStatus } from '@/graphql/WebSocketLink'

export const UserContext = createContext({ user: null, loading: true })

export default function UserProvider({ children }) {
  const { data, loading } = useCurrentUserQuery({
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  })
  const user = data?.user
  useEffect(() => {
    if (user) {
      Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.username
      })
    } else {
      Sentry.configureScope(scope => scope.setUser(null))
      /*if (data && !data.user && localStorage.getItem('token')) {
        localStorage.removeItem('token')
        location.reload()
      }*/
    }
  }, [user])
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
