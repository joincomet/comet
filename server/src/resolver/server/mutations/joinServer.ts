import { Server, ServerInvite, ServerUser, User } from '@/entity'
import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'
import { ReorderUtils } from '@/util'

@InputType()
export class JoinServerInput {
  @Field(() => ID, { nullable: true })
  serverId: string

  @Field(() => ID, { nullable: true })
  inviteId: string
}

export async function joinServer(
  { em, userId, liveQueryStore }: Context,
  { serverId, inviteId }: JoinServerInput
): Promise<Server> {
  const user = await em.findOneOrFail(User, userId)
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
  await user.checkBannedFromServer(em, serverId)
  const firstServerJoin = await em.findOne(
    ServerUser,
    { server, user: this },
    ['server'],
    { position: 'DESC' }
  )
  const join = em.create(ServerUser, {
    server,
    user: this,
    position: firstServerJoin
      ? ReorderUtils.positionBefore(firstServerJoin.position)
      : ReorderUtils.FIRST_POSITION
  })
  await em.persistAndFlush(join)
  liveQueryStore.invalidate(`User:${user.id}`)
  return server
}
