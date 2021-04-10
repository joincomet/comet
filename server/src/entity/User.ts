import { Authorized, Field, Int, ObjectType, Publisher } from 'type-graphql'
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
  ChannelRole,
  FriendData,
  Group,
  Message,
  Server,
  ServerUserBan,
  ServerUserJoin,
  UserFolder
} from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import { ChannelPermission, ServerPermission } from '@/types'
import { CustomError } from '@/types/CustomError'

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
  lastLoginAt?: Date

  @Field()
  get isOnline(): boolean {
    if (!this.lastLoginAt) return false
    const timeout = 5 * 60 * 1000 // five minutes
    return new Date().getTime() - this.lastLoginAt.getTime() < timeout
  }

  @Property({ columnType: 'text' })
  passwordHash: string

  @Property()
  isDeleted: boolean = false

  @Field()
  @Property()
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

  @Property()
  isBanned: boolean = false

  @Property({ nullable: true, columnType: 'text' })
  banReason?: string

  @Property({ nullable: true })
  purchasedPremiumAt?: Date

  @Field(() => Int)
  unreadCount: number = 0

  @Field()
  get isPremium(): boolean {
    if (!this.purchasedPremiumAt) return false
    const millis = 30 * 24 * 60 * 60 * 1000 // 30 days
    return new Date().getTime() - this.purchasedPremiumAt.getTime() < millis
  }

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
      throw new Error('error.server.notJoined')
  }

  async checkBannedFromServer(em: EntityManager, server: Server) {
    if (await this.isBannedFromServer(em, server))
      throw new Error('error.server.banned')
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
      throw new Error('error.server.joinLimit')

    let serverJoin = await em.findOne(ServerUserJoin, {
      server,
      user: this
    })
    if (serverJoin) throw new Error('error.server.alreadyJoined')
    serverJoin = em.create(ServerUserJoin, { server, user: this })
    server.userCount++

    await em.populate(server, 'systemMessagesChannel')
    if (server.systemMessagesChannel) {
      const joinMessage = em.create(Message, {
        channel: server.systemMessagesChannel,
        author: this
      })
      em.persist(joinMessage)
    }

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
    await em.populate(server, ['owner'])
    if (server.owner === this) return true
    const join = await em.findOne(ServerUserJoin, { server, user: this }, [
      'roles'
    ])
    if (!join) return false
    const roles = join.roles.getItems()
    return !!roles.find(role => role.hasPermission(permission))
  }

  async checkServerPermission(
    em: EntityManager,
    server: Server,
    permission: ServerPermission
  ) {
    await this.checkJoinedServer(em, server)
    if (!(await this.hasServerPermission(em, server, permission)))
      throw new CustomError('error.server.missingPermission', permission)
  }

  async hasChannelPermission(
    em: EntityManager,
    channel: Channel,
    channelPermission: ChannelPermission,
    serverPermission: ServerPermission = null
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
      throw new CustomError(
        'error.channel.missingPermission',
        channelPermission
      )
  }

  async isInGroup(em: EntityManager, group: Group) {
    await em.populate(group, ['users'])
    return group.users.contains(this)
  }

  async checkInGroup(em: EntityManager, group: Group) {
    if (!(await this.isInGroup(em, group)))
      throw new Error('error.group.notJoined')
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
    }
    if (!theirData) {
      theirData = em.create(FriendData, {
        user: toUser,
        toUser: this
      })
    }

    return [myData, theirData]
  }
}
