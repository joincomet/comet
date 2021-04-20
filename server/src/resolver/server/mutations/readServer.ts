import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { ChannelUser, Server } from '@/entity'

@InputType()
export class ReadServerInput {
  @Field(() => ID)
  serverId: string
}

export async function readServer(
  { em, userId, liveQueryStore }: Context,
  { serverId }: ReadServerInput
): Promise<Server> {
  const server = await em.findOneOrFail(Server, serverId)
  await em
    .createQueryBuilder(ChannelUser)
    .where({ user: userId, channel: { server } })
    .update({ mentionCount: 0, lastViewAt: new Date() })
    .execute()
  liveQueryStore.invalidate(`Server:${serverId}`)
  return server
}
