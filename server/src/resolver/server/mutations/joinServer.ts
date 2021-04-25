import {
  Message,
  MessageType,
  Server,
  ServerInvite,
  ServerUser,
  ServerUserStatus,
  User
} from '@/entity'
import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { ReorderUtils } from '@/util'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Publisher } from 'type-graphql/dist/interfaces/Publisher'

@InputType()
export class JoinServerInput {
  @Field(() => ID, { nullable: true })
  serverId: string

  @Field(() => ID, { nullable: true })
  inviteId: string
}

export async function joinServer(
  { em, userId, liveQueryStore }: Context,
  { serverId, inviteId }: JoinServerInput,
  notifyMessageChanged: Publisher<ChangePayload>
): Promise<Server> {
  const user = await em.findOneOrFail(User, userId)
  if ((!inviteId && !serverId) || (inviteId && serverId))
    throw new Error('Must provide either inviteId or serverId')
  let server: Server
  if (inviteId) {
    const invite = await em.findOneOrFail(ServerInvite, inviteId, [
      'server.systemMessagesChannel'
    ])
    server = invite.server
    if (invite.isExpired) throw new Error('error.server.inviteExpired')
    invite.uses++
    em.persist(invite)
  } else if (serverId) {
    server = await em.findOneOrFail(Server, serverId, ['systemMessagesChannel'])
    if (!server.isPublic) throw new Error('Requires invite to join server')
  }
  await user.checkBannedFromServer(em, serverId)
  const firstServerJoin = await em.findOne(
    ServerUser,
    { server, user },
    ['server'],
    { position: 'ASC' }
  )
  let join = await em.findOne(ServerUser, {
    server,
    user
  })
  if (join && join.status === ServerUserStatus.Joined)
    throw new Error('Already joined this server')
  if (!join) {
    join = em.create(ServerUser, {
      server,
      user
    })
  }
  join.status = ServerUserStatus.Joined
  join.position = firstServerJoin
    ? ReorderUtils.positionBefore(firstServerJoin.position)
    : ReorderUtils.FIRST_POSITION
  server.userCount++
  await em.persistAndFlush([join, server])
  liveQueryStore.invalidate([`User:${user.id}`, `Server:${server.id}`])
  server.isJoined = true
  if (server.sendWelcomeMessage && server.systemMessagesChannel) {
    const joinMessage = em.create(Message, {
      author: user,
      serverUser: join,
      type: MessageType.Join,
      channel: server.systemMessagesChannel
    })
    em.persistAndFlush(joinMessage).then(() =>
      notifyMessageChanged({ type: ChangeType.Added, id: joinMessage.id })
    )
  }
  return server
}
