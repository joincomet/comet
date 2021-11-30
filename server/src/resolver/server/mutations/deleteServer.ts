import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Server, ServerUser, ServerUserStatus, User } from '@/entity'
import * as argon2 from 'argon2'
import {logger} from "@/util";

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
  logger('deleteServer')
  const user = await em.findOneOrFail(User, userId)
  const match = await argon2.verify(user.passwordHash, password)
  if (!match) throw new Error('error.login.wrongPassword')

  const server = await em.findOneOrFail(
    Server,
    { id: serverId, isDeleted: false },
    ['owner']
  )
  if (!user.isAdmin && server.owner !== user)
    throw new Error('Must be owner or admin to delete server')
  server.isDeleted = true
  await em.persistAndFlush(server)
  await em
    .createQueryBuilder(ServerUser)
    .update({ status: ServerUserStatus.None })
    .where({ status: ServerUserStatus.Joined, server })
    .execute()
  liveQueryStore.invalidate(`Server:${serverId}`)
  return serverId
}
