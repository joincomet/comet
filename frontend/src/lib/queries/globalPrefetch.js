import { fetchCurrentUser } from '@/lib/queries/useCurrentUser'

export const globalPrefetch = async (queryClient, ctx) => {
  await queryClient.prefetchQuery('currentUser', () => fetchCurrentUser(ctx))
}
