import { useCurrentUserQuery } from '@/graphql/hooks'
import { wsStatus } from '@/graphql/WebSocketLink'
import * as Sentry from '@sentry/react'
import { useEffect } from 'react'

export const useCurrentUser = () => {
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
  return [user, (loading || wsStatus.status !== 'connected') && !user]
}
