import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Server, User } from '@/entity'
import * as argon2 from 'argon2'

@InputType()
export class DeleteServerInput {
  @Field(() => ID)
  serverId: string

  @Field()
  password: string
}

export async function deleteServer(
  { em, userId, liveQueryStore }: Context,
  { serverId, password }: DeleteServerInput
): Promise<string> {
  const user = await em.findOneOrFail(User, userId)
  const match = await argon2.verify(user.passwordHash, password)
  if (!match) throw new Error('error.login.wrongPassword')

  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (server.owner !== user) throw new Error('Must be owner to delete server')
  server.isDeleted = true
  await em.persistAndFlush(server)
  liveQueryStore.invalidate(`Server:${serverId}`)
  return serverId
}
