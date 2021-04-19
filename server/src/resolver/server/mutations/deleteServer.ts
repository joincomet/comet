import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Server, User } from '@/entity'

@InputType()
export class DeleteServerInput {
  @Field(() => ID)
  serverId: string
}

export async function deleteServer(
  { em, userId, liveQueryStore }: Context,
  { serverId }: DeleteServerInput
): Promise<boolean> {
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (server.owner !== em.getReference(User, userId))
    throw new Error('Must be owner to delete server')
  server.isDeleted = true
  await em.persistAndFlush(server)
  liveQueryStore.invalidate(`Server:${serverId}`)
  return true
}
