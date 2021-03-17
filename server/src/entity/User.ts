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
  Channel,
  Group,
  Server,
  UserFolder,
  ServerUserBan,
  ServerUserJoin,
  ServerRole,
  ChannelRole,
  FriendData
} from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import { ServerPermission, ChannelPermission } from '@/types'

@ObjectType({ implements: BaseEntity })
@Entity()
export class User extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  name: string

  @Field()
  @Property({ columnType: 'text' })
  tag: string

  @Field()
  @Formula("name || '#' || tag")
  username: string

  @Authorized('USER')
  @Field()
  @Property({ columnType: 'text' })
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

  @Property({ columnType: 'text' })
  passwordHash: string

  @Property({ default: false })
  isDeleted: boolean

  @Field()
  @Property({ default: false })
  isAdmin: boolean = false

  @OneToMany(() => UserFolder, 'user', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  folders = new Collection<UserFolder>(this)

  @OneToMany(() => ServerUserJoin, 'user', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  serverJoins = new Collection<ServerUserJoin>(this)

  @ManyToMany(() => Group, group => group.users, {
    orderBy: { lastMessageAt: QueryOrder.DESC }
  })
  groups = new Collection<Group>(this)

  @OneToMany(() => FriendData, 'user')
  friendData = new Collection<FriendData>(this)

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  avatarUrl?: string

  @Field()
  isCurrentUser: boolean

  @Property({ default: false })
  isBanned: boolean

  @Property({ nullable: true, columnType: 'text' })
  banReason?: string

  async isBannedFromServer(
    em: EntityManager,
    server: Server
  ): Promise<boolean> {
    return Boolean(await em.count(ServerUserBan, { server, user: this }))
  }

  async hasJoinedServer(em: EntityManager, server: Server): Promise<boolean> {
    return Boolean(await em.count(ServerUserJoin, { server, user: this }))
  }

  async checkJoinedServer(em: EntityManager, server: Server) {
    if (!(await this.hasJoinedServer(em, server)))
      throw new Error('You have not joined this server')
  }

  async checkBannedFromServer(em: EntityManager, server: Server) {
    if (await this.isBannedFromServer(em, server))
      throw new Error('You are banned from this server')
  }

  async banFromServer(
    em: EntityManager,
    refetchUsers: Publisher<string>,
    server: Server,
    reason?: string,
    bannedBy?: User
  ) {
    const ban = em.create(ServerUserBan, {
      user: this,
      server,
      reason,
      bannedBy
    })
    await this.leaveServer(em, refetchUsers, server)
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
    server: Server
  ) {
    await this.checkBannedFromServer(em, server)
    if ((await em.count(ServerUserJoin, { user: this })) >= 100)
      throw new Error('Cannot join more than 100 servers')

    let serverJoin = await em.findOne(ServerUserJoin, {
      server,
      user: this
    })
    if (serverJoin) throw new Error('You have already joined this server')
    serverJoin = em.create(ServerUserJoin, { server, user: this })
    server.userCount++
    await em.persistAndFlush([server, serverJoin])
    await refetchUsers(this.id)
  }

  async leaveServer(
    em: EntityManager,
    refetchUsers: Publisher<string>,
    server: Server
  ) {
    const join = await em.findOneOrFail(ServerUserJoin, { server, user: this })
    server.userCount--
    await em.remove(join).persistAndFlush([server, join])
    await refetchUsers(this.id)
  }

  async hasServerPermission(
    em: EntityManager,
    server: Server,
    permission: ServerPermission
  ): Promise<boolean> {
    if (this.isAdmin) return true
    const join = await em.findOne(ServerUserJoin, { server, user: this }, [
      'roles'
    ])
    if (!join) return false
    await em.populate(server, ['owner'])
    if (server.owner === this) return true
    const roles = join.roles.getItems()
    return !!roles.find(
      role =>
        role.hasPermission(ServerPermission.ServerAdmin) ||
        role.hasPermission(permission)
    )
  }

  async checkServerPermission(
    em: EntityManager,
    server: Server,
    permission: ServerPermission
  ) {
    await this.checkJoinedServer(em, server)
    if (!(await this.hasServerPermission(em, server, permission)))
      throw new Error(`Missing server permission ${permission}`)
  }

  async hasChannelPermission(
    em: EntityManager,
    channel: Channel,
    channelPermission: ChannelPermission,
    serverPermission: ServerPermission | null
  ): Promise<boolean> {
    if (this.isAdmin) return true
    await em.populate(channel, ['server.owner'])
    if (channel.server.owner === this) return true
    const join = await em.findOne(
      ServerUserJoin,
      { server: channel.server, user: this },
      ['roles']
    )
    if (!join) return false
    const roles = join.roles.getItems()
    if (!!roles.find(role => role.hasPermission(ServerPermission.ServerAdmin)))
      return true
    const channelRoles = await em.find(ChannelRole, {
      $and: [
        { channel },
        {
          role: {
            $in: roles
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
    channel: Channel,
    channelPermission: ChannelPermission,
    serverPermission: ServerPermission | null
  ) {
    await em.populate(channel, ['server'])
    await this.checkJoinedServer(em, channel.server)
    const hasChannelPermission = await this.hasChannelPermission(
      em,
      channel,
      channelPermission,
      serverPermission
    )
    if (!hasChannelPermission)
      throw new Error(`Missing channel permission ${channelPermission}`)
  }

  async isInGroup(em: EntityManager, group: Group) {
    await em.populate(group, ['users'])
    return group.users.contains(this)
  }

  async checkInGroup(em: EntityManager, group: Group) {
    if (!(await this.isInGroup(em, group)))
      throw new Error('You are not in this group')
  }

  async getFriendData(em: EntityManager, userId: string) {
    const toUser = await em.findOneOrFail(User, userId)
    let myData = await em.findOne(FriendData, { user: this, toUser })
    let theirData = await em.findOne(FriendData, {
      user: toUser,
      toUser: this
    })

    if (!myData) {
      myData = em.create(FriendData, {
        user: this,
        toUser
      })
      em.persist(myData)
    }
    if (!theirData) {
      theirData = em.create(FriendData, {
        user: toUser,
        toUser: this
      })
      em.persist(theirData)
    }

    return [myData, theirData]
  }
}
