import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { ChannelUser, ServerUser, ServerUserStatus } from '@/entity'

@InputType()
export class ReadServerInput {
  @Field(() => ID)
  serverId: string
}

export async function readServer(
  { em, userId, liveQueryStore }: Context,
  { serverId }: ReadServerInput
): Promise<ServerUser> {
  await em
    .createQueryBuilder(ChannelUser)
    .where({ user: userId, channel: { server: serverId } })
    .update({ mentionCount: 0, lastViewAt: new Date() })
    .execute()
  const serverUser = await em.findOneOrFail(ServerUser, {
    user: userId,
    server: serverId,
    status: ServerUserStatus.Joined
  })
  liveQueryStore.invalidate(`Server:${serverId}`)
  return serverUser
}
