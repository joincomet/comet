import { Server, User } from '@/entity'
import { Context } from '@/types'
import { getJoinedServers, getMutualServers } from '@/resolver/server/queries'

export async function servers(
  { em, user: currentUser }: Context,
  user: User
): Promise<Server[]> {
  if (currentUser === user) {
    return getJoinedServers({ em, user: currentUser })
  } else {
    return getMutualServers({ em, user: currentUser }, user.id)
  }
}
