import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Server, User } from '@/entity'
import {logger} from "@/util";

@InputType()
export class UnfeatureServerInput {
  @Field(() => ID)
  serverId: string
}

export async function unfeatureServer(
  { em, userId }: Context,
  { serverId }: UnfeatureServerInput
): Promise<Server> {
  logger('unfeatureServer')
  const user = await em.findOneOrFail(User, userId)
  if (!user.isAdmin) throw new Error('Must be admin to set featured servers')
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (!server.isFeatured) throw new Error('Server not featured')
  server.isFeatured = false
  await em.persistAndFlush(server)
  return server
}
