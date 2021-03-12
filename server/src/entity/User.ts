import { Authorized, Field, ObjectType, Publisher } from 'type-graphql'
import {
  Collection,
  Entity,
  Formula,
  ManyToMany,
  OneToMany,
  Property,
  QueryOrder,
  Unique
} from '@mikro-orm/core'
import {
  BaseEntity,
  ChatChannel,
  ChatGroup,
  Server,
  UserFolder,
  ServerUserBan,
  ServerUserJoin,
  ServerRole,
  ChatChannelRole,
  DirectMessage,
  FriendRequest,
  UserBlock
} from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import { UserServerPayload } from '@/resolver/server'
import { ServerPermission, ChannelPermission } from '@/types'
import { Auth } from '@/util/auth'

@ObjectType({ implements: BaseEntity })
@Entity()
export class User extends BaseEntity {
  @Field()
  @Property()
  name: string

  @Field()
  @Property()
  tag: string

  @Field()
  @Formula("name || '#' || tag")
  username: string

  @Authorized(Auth.User)
  @Field()
  @Property()
  @Unique()
  email: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastLogin?: Date

  @Field()
  get isOnline(): boolean {
    if (!this.lastLogin) return false
    const timeout = 5 * 60 * 1000 // five minutes
    return new Date().getTime() - this.lastLogin.getTime() < timeout
  }

  @Property()
  passwordHash: string

  @Property({ default: false })
  isDeleted: boolean

  @Field()
  @Property({ default: false })
  isAdmin: boolean

  @OneToMany(() => UserFolder, 'user', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  folders = new Collection<UserFolder>(this)

  @OneToMany(() => ServerUserJoin, 'user', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  serverJoins = new Collection<ServerUserJoin>(this)

  @OneToMany(() => UserBlock, 'user')
  outgoingBlocks = new Collection<UserBlock>(this)

  @OneToMany(() => UserBlock, 'blockedUser')
  incomingBlocks = new Collection<UserBlock>(this)

  @OneToMany(() => FriendRequest, 'fromUser')
  outgoingFriendRequests = new Collection<FriendRequest>(this)

  @OneToMany(() => FriendRequest, 'toUser')
  incomingFriendRequests = new Collection<FriendRequest>(this)

  @ManyToMany(() => ChatGroup, group => group.users, {
    orderBy: { updatedAt: QueryOrder.DESC }
  })
  groups = new Collection<ChatGroup>(this)

  @Field({ nullable: true })
  @Property({ nullable: true })
  avatarUrl?: string

  @Field()
  isCurrentUser: boolean

  @Field(() => [ServerRole])
  @ManyToMany(() => ServerRole, 'users')
  roles = new Collection<ServerRole>(this)

  @Property({ default: false })
  isBanned: boolean

  @Property({ nullable: true })
  banReason?: string

  async isBannedFromServer(
    serverId: string,
    em: EntityManager
  ): Promise<boolean> {
    return Boolean(
      await em.count(ServerUserBan, { server: serverId, user: this })
    )
  }

  async hasJoinedServer(em: EntityManager, serverId: string): Promise<boolean> {
    return Boolean(
      await em.count(ServerUserJoin, { server: serverId, user: this })
    )
  }

  async checkJoinedServer(em: EntityManager, serverId: string) {
    if (!(await this.hasJoinedServer(em, serverId)))
      throw new Error('You have not joined this server')
  }

  async checkBannedFromServer(em: EntityManager, serverId: string) {
    if (await this.isBannedFromServer(serverId, em))
      throw new Error('You are banned from this server')
  }

  async banFromServer(
    em: EntityManager,
    refetchUsers: Publisher<string>,
    serverId: string,
    reason?: string,
    bannedById?: string
  ) {
    const ban = em.create(ServerUserBan, {
      user: this,
      server: serverId,
      reason,
      bannedBy: bannedById
    })
    await this.leaveServer(em, refetchUsers, serverId)
    await em.persistAndFlush(ban)
    await refetchUsers(this.id)
  }

  async unbanFromServer(em: EntityManager, server: Server) {
    const ban = await em.findOneOrFail(ServerUserBan, {
      user: this,
      server
    })
    await em.remove(ban).flush()
  }

  async joinServer(
    em: EntityManager,
    refetchUsers: Publisher<string>,
    serverId: string
  ) {
    const user = this
    const server = await em.findOneOrFail(Server, serverId)
    await user.checkBannedFromServer(em, serverId)
    if ((await em.count(ServerUserJoin, { user })) >= 100)
      throw new Error('Cannot join more than 100 servers')

    let serverJoin = await em.findOne(ServerUserJoin, {
      server,
      user
    })
    if (serverJoin) throw new Error('You have already joined this server')
    serverJoin = em.create(ServerUserJoin, { server, user })
    server.userCount++
    await em.persistAndFlush([server, serverJoin])
    await refetchUsers(this.id)
  }

  async leaveServer(
    em: EntityManager,
    refetchUsers: Publisher<string>,
    serverId: string
  ) {
    const user = this
    const server = await em.findOneOrFail(Server, serverId)
    const join = await em.findOneOrFail(ServerUserJoin, { server, user })
    server.userCount--
    await em.remove(join).persistAndFlush([server, join])
    await refetchUsers(this.id)
  }

  async hasServerPermission(
    em: EntityManager,
    permission: ServerPermission,
    serverId: string
  ): Promise<boolean> {
    if (this.isAdmin) return true
    if (!(await this.hasJoinedServer(em, serverId))) return false
    const server = await em.findOneOrFail(Server, serverId)
    await em.populate(server, ['owner', 'roles'])
    if (server.owner === this) return true
    const serverRoles = server.roles.getItems()
    const userRoles = this.roles
      .getItems()
      .filter(role => serverRoles.includes(role))
    return !!userRoles.find(
      role =>
        role.hasPermission(ServerPermission.ServerAdmin) ||
        role.hasPermission(permission)
    )
  }

  async checkServerPermission(
    em: EntityManager,
    permission: ServerPermission,
    serverId: string
  ) {
    await this.checkJoinedServer(em, serverId)
    if (!(await this.hasServerPermission(em, permission, serverId)))
      throw new Error(`Missing server permission ${permission}`)
  }

  async hasChannelPermission(
    em: EntityManager,
    channelPermission: ChannelPermission,
    serverPermission: ServerPermission | null,
    channelId: string
  ): Promise<boolean> {
    const user = this
    if (user.isAdmin) return true
    const channel = await em.findOneOrFail(ChatChannel, channelId, [
      'server.owner'
    ])
    if (channel.server.owner === user) return true
    if (!(await this.hasJoinedServer(em, channel.server.id))) return false
    const roles = await user.roles.matching({
      where: { server: channel.server }
    })
    if (!!roles.find(role => role.hasPermission(ServerPermission.ServerAdmin)))
      return true
    const channelRoles = await em.find(ChatChannelRole, {
      $and: [
        { channel },
        {
          role: {
            $in: user.roles.getItems()
          }
        }
      ]
    })
    const hasServerPerm =
      !!serverPermission &&
      !!roles.find(role => role.hasPermission(serverPermission))
    return !!channelRoles.find(
      channelRole =>
        !channelRole.deniedPermissions.includes(channelPermission) &&
        (channelRole.allowedPermissions.includes(channelPermission) ||
          hasServerPerm)
    )
  }

  async checkChannelPermission(
    em: EntityManager,
    channelPermission: ChannelPermission,
    serverPermission: ServerPermission | null,
    channel: ChatChannel
  ) {
    await em.populate(channel, ['server'])
    await this.checkJoinedServer(em, channel.server.id)
    const hasChannelPermission = await this.hasChannelPermission(
      em,
      channelPermission,
      serverPermission,
      channel.id
    )
    if (!hasChannelPermission)
      throw new Error(`Missing channel permission ${channelPermission}`)
  }

  async isInGroup(em: EntityManager, groupId: string) {
    const group = await em.findOneOrFail(ChatGroup, groupId)
    return group.users.contains(this)
  }

  async checkInGroup(em: EntityManager, groupId: string) {
    if (!(await this.isInGroup(em, groupId)))
      throw new Error('You are not in this group')
  }

  async isInDM(em: EntityManager, dm: DirectMessage) {
    return dm.user1 === this || dm.user2 === this
  }

  async checkInDM(em: EntityManager, dm: DirectMessage) {
    if (!(await this.isInDM(em, dm)))
      throw new Error('You are not in this direct message')
  }
}
