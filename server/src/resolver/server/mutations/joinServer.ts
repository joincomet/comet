import {
  Channel,
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
import {logger, ReorderUtils} from '@/util'
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
  logger('joinServer')
  const user = await em.findOneOrFail(User, userId)
  let server = await em.findOneOrFail(Server, serverId)
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
  serverUser.role = await em.findOne(Role, { server, isDefault: true })
  server.userCount++
  await em.persistAndFlush([serverUser, server])
  liveQueryStore.invalidate(`Query.serverUsers(serverId:"${server.id}")`)
  server.isJoined = true
  const defaultChannel = await em.findOne(Channel, { server, isDefault: true })
  if (defaultChannel) {
    const joinMessage = em.create(Message, {
      author: user,
      type: MessageType.Join,
      channel: defaultChannel
    })
    await em.persistAndFlush(joinMessage)
    await notifyMessageChanged({ type: ChangeType.Added, id: joinMessage.id })
  }
  return server
}
