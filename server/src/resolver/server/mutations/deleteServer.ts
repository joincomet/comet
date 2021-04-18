import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Server } from '@/entity'

@InputType()
export class DeleteServerInput {
  @Field(() => ID)
  serverId: string
}

export async function deleteServer(
  { em, user, liveQueryStore }: Context,
  { serverId }: DeleteServerInput
): Promise<boolean> {
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (server.owner !== user) throw new Error('Must be owner to delete server')
  server.isDeleted = true
  await em.persistAndFlush(server)
  liveQueryStore.invalidate(`Server:${serverId}`)
  return true
}
