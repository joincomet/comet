import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Server, User } from '@/entity'
import {logger} from "@/util";

@InputType()
export class FeatureServerInput {
  @Field(() => ID)
  serverId: string
}

export async function featureServer(
  { em, userId }: Context,
  { serverId }: FeatureServerInput
): Promise<Server> {
  logger('featureServer')
  const user = await em.findOneOrFail(User, userId)
  if (!user.isAdmin) throw new Error('Must be admin to set featured servers')
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if (server.isFeatured) throw new Error('Server already featured')
  server.isFeatured = true
  await em.persistAndFlush(server)
  return server
}
