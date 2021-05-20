import {
  Message,
  MessageType,
  Role,
  Server,
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
}

export async function joinServer(
  { em, userId, liveQueryStore }: Context,
  { serverId }: JoinServerInput,
  notifyMessageChanged: Publisher<ChangePayload>
): Promise<Server> {
  const user = await em.findOneOrFail(User, userId)
  let server = await em.findOneOrFail(Server, serverId, [
    'systemMessagesChannel'
  ])
  await user.checkBannedFromServer(em, serverId)
  const firstServerJoin = await em.findOne(
    ServerUser,
    { server, user },
    ['server'],
    { position: 'ASC' }
  )
  let serverUser = await em.findOne(ServerUser, {
    server,
    user
  })
  if (serverUser && serverUser.status === ServerUserStatus.Joined)
    throw new Error('Already joined this server')
  if (!serverUser) {
    serverUser = em.create(ServerUser, {
      server,
      user
    })
  }
  serverUser.status = ServerUserStatus.Joined
  serverUser.position = firstServerJoin
    ? ReorderUtils.positionBefore(firstServerJoin.position)
    : ReorderUtils.FIRST_POSITION
  const everyoneRole = await em.findOne(Role, { server, name: '@everyone' })
  if (everyoneRole) serverUser.roles.set([everyoneRole])
  server.userCount++
  await em.persistAndFlush([serverUser, server])
  liveQueryStore.invalidate([
    `User:${user.id}`,
    `Server:${server.id}`,
    `Query.serverUsers(serverId:"${server.id}")`
  ])
  server.isJoined = true
  if (server.systemMessagesChannel) {
    const joinMessage = em.create(Message, {
      author: user,
      serverUser: serverUser,
      type: MessageType.Join,
      channel: server.systemMessagesChannel
    })
    await em.persistAndFlush(joinMessage)
    await notifyMessageChanged({ type: ChangeType.Added, id: joinMessage.id })
  }
  return server
}
