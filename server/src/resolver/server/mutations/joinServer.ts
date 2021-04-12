import { UserServerPayload } from '@/resolver/server/subscriptions/UserServerPayload'
import { Server, ServerInvite } from '@/entity'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Context } from '@/types'

@ArgsType()
export class JoinServerArgs {
  @Field(() => ID, { nullable: true })
  serverId: string

  @Field(() => ID, { nullable: true })
  inviteId: string
}

export async function joinServer(
  { em, user }: Context,
  { serverId, inviteId }: JoinServerArgs,
  notifyUserJoinedServer: Publisher<UserServerPayload>
): Promise<Server> {
  if ((!inviteId && !serverId) || (inviteId && serverId))
    throw new Error('Must provide either inviteId or serverId')
  let server: Server
  if (inviteId) {
    const invite = await em.findOneOrFail(ServerInvite, inviteId, ['server'])
    server = invite.server
    if (invite.isExpired) throw new Error('error.server.inviteExpired')
    invite.uses++
    em.persist(invite)
  } else if (serverId) {
    server = await em.findOneOrFail(Server, serverId)
    if (!server.isPublic) throw new Error('Requires invite to join server')
  }
  await user.joinServer(em, server.id, notifyUserJoinedServer)
  await notifyUserJoinedServer({ serverId: server.id, userId: user.id })
  return server
}
