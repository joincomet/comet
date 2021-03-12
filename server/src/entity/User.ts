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
    server: Server,
    em: EntityManager
  ): Promise<boolean> {
    return Boolean(
      await em.count(ServerUserBan, { server, user: this, isActive: true })
    )
  }

  async hasJoinedServer(em: EntityManager, server: Server): Promise<boolean> {
    return Boolean(
      await em.count(ServerUserJoin, { server, user: this, isActive: true })
    )
  }

  async checkJoinedServer(em: EntityManager, server: Server) {
    if (!(await this.hasJoinedServer(em, server)))
      throw new Error('You have not joined this server')
  }

  async checkBannedFromServer(em: EntityManager, server: Server) {
    if (await this.isBannedFromServer(server, em))
      throw new Error('You are banned from this server')
  }

  async banFromServer(
    em: EntityManager,
    server: Server,
    userLeftServer: Publisher<UserServerPayload>,
    reason?: string,
    bannedBy?: User
  ) {
    const ban = em.create(ServerUserBan, {
      user: this,
      server,
      reason,
      bannedBy
    })
    await this.leaveServer(em, server, userLeftServer)
    await em.persistAndFlush(ban)
    await userLeftServer({ server, user: this })
  }

  async unbanFromServer(em: EntityManager, server: Server) {
    const ban = await em.findOneOrFail(ServerUserBan, {
      user: this,
      server,
      isActive: true
    })
    ban.isActive = false
    await em.persistAndFlush(ban)
  }

  async joinServer(
    em: EntityManager,
    server: Server,
    userJoinedServer: Publisher<UserServerPayload>
  ) {
    const user = this
    await user.checkBannedFromServer(em, server)
    if ((await em.count(ServerUserJoin, { user })) >= 100)
      throw new Error('Cannot join more than 100 servers')

    let serverJoin = await em.findOne(ServerUserJoin, {
      server,
      user,
      isActive: true
    })
    if (serverJoin) throw new Error('You have already joined this server')
    serverJoin = em.create(ServerUserJoin, { server, user })
    server.userCount++
    await em.persistAndFlush([server, serverJoin])
    await userJoinedServer({ server, user })
  }

  async leaveServer(
    em: EntityManager,
    server: Server,
    userLeftServer: Publisher<UserServerPayload>
  ) {
    const user = this
    const join = await em.findOneOrFail(ServerUserJoin, { server, user })
    server.userCount--
    join.isActive = false
    await em.persistAndFlush([server, join])
    await userLeftServer({ server, user })
  }

  async hasServerPermission(
    em: EntityManager,
    permission: ServerPermission,
    server: Server
  ): Promise<boolean> {
    if (this.isAdmin) return true
    if (!(await this.hasJoinedServer(em, server))) return false
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
    server: Server
  ) {
    await this.checkJoinedServer(em, server)
    if (!(await this.hasServerPermission(em, permission, server)))
      throw new Error(`Missing server permission ${permission}`)
  }

  async hasChannelPermission(
    em: EntityManager,
    channelPermission: ChannelPermission,
    serverPermission: ServerPermission | null,
    channel: ChatChannel
  ): Promise<boolean> {
    const user = this
    if (user.isAdmin) return true
    await em.populate(channel, ['server.owner'])
    if (channel.server.owner === user) return true
    if (!(await this.hasJoinedServer(em, channel.server))) return false
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
    await this.checkJoinedServer(em, channel.server)
    const hasChannelPermission = await this.hasChannelPermission(
      em,
      channelPermission,
      serverPermission,
      channel
    )
    if (!hasChannelPermission)
      throw new Error(`Missing channel permission ${channelPermission}`)
  }

  async isInGroup(em: EntityManager, group: ChatGroup) {
    return group.users.contains(this)
  }

  async checkInGroup(em: EntityManager, group: ChatGroup) {
    if (!(await this.isInGroup(em, group)))
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
