import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { ServerPermission, ServerUser, ServerUserStatus } from '@/entity'

@InputType()
export class UnbanUserFromServerInput {
  @Field(() => ID)
  serverId: string

  @Field(() => ID)
  userId: string
}

export async function unbanUserFromServer(
  { em, user, liveQueryStore }: Context,
  { serverId, userId }: UnbanUserFromServerInput
): Promise<boolean> {
  await user.checkServerPermission(em, serverId, ServerPermission.ManageUsers)
  const serverUser = await em.findOneOrFail(ServerUser, {
    user: userId,
    server: serverId,
    status: ServerUserStatus.Banned
  })
  serverUser.status = ServerUserStatus.None
  await em.persistAndFlush(serverUser)
  liveQueryStore.invalidate(`User:${userId}`)
  return true
}
