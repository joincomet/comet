import { fetchCurrentUser } from '@/lib/queries/useCurrentUser'
import { fetchPlanets } from '@/lib/queries/usePlanets'
import { fetchNotifications } from '@/lib/queries/useNotifications'

export const globalPrefetch = async (queryClient, ctx) => {
  await queryClient.prefetchQuery('currentUser', () => fetchCurrentUser(ctx))
  await queryClient.prefetchQuery(
    ['planets', { sort: 'AZ', joinedOnly: true }],
    key => fetchPlanets(key, ctx)
  )
  await queryClient.prefetchQuery(
    ['planets', { sort: 'TOP', joinedOnly: false }],
    key => fetchPlanets(key, ctx)
  )
  await queryClient.prefetchQuery(
    ['notifications', { unreadOnly: true }],
    key => fetchNotifications(key, ctx)
  )
}
