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
  Folder,
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
import { FolderVisibility } from '@/resolver/folder'
import { FriendStatus } from '@/resolver/user'

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
    serverId: string
  ): Promise<boolean> {
    return !!(await em.count(ServerUserBan, { server: serverId, user: this }))
  }

  async hasJoinedServer(em: EntityManager, serverId: string): Promise<boolean> {
    return !!(await em.count(ServerUserJoin, { server: serverId, user: this }))
  }

  async checkJoinedServer(em: EntityManager, serverId: string) {
    if (!(await this.hasJoinedServer(em, serverId)))
      throw new Error('error.server.notJoined')
  }

  async checkBannedFromServer(em: EntityManager, serverId: string) {
    if (await this.isBannedFromServer(em, serverId))
      throw new Error('error.server.banned')
  }

  async banFromServer(
    em: EntityManager,
    refetchUsers: Publisher<string>,
    serverId: string,
    reason?: string,
    bannedBy?: User
  ) {
    const ban = em.create(ServerUserBan, {
      user: this,
      server: serverId,
      reason,
      bannedBy
    })
    await this.leaveServer(em, refetchUsers, serverId)
    await em.persistAndFlush(ban)
    await refetchUsers(this.id)
  }

  async unbanFromServer(em: EntityManager, serverId: string) {
    const ban = await em.findOneOrFail(ServerUserBan, {
      user: this,
      server: serverId
    })
    await em.remove(ban).flush()
  }

  async joinServer(
    em: EntityManager,
    refetchUsers: Publisher<string>,
    serverId: string
  ) {
    await this.checkBannedFromServer(em, serverId)
    if ((await em.count(ServerUserJoin, { user: this })) >= 100)
      throw new Error('error.server.joinLimit')

    const server = await em.findOneOrFail(Server, serverId, [
      'systemMessagesChannel'
    ])

    let serverJoin = await em.findOne(ServerUserJoin, {
      server,
      user: this
    })
    if (serverJoin) throw new Error('error.server.alreadyJoined')
    serverJoin = em.create(ServerUserJoin, { server, user: this })
    server.userCount++

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
    serverId: string
  ) {
    const server = await em.findOneOrFail(Server, serverId, ['owner'])
    if (server.owner === this) throw new Error('error.server.owner')
    const join = await em.findOneOrFail(ServerUserJoin, { server, user: this })
    server.userCount--
    await em.remove(join).persistAndFlush([server, join])
    await refetchUsers(this.id)
  }

  async hasServerPermission(
    em: EntityManager,
    serverId: string,
    permission: ServerPermission
  ): Promise<boolean> {
    if (this.isAdmin) return true
    const server = await em.findOneOrFail(Server, serverId, ['owner'])
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
    serverId: string,
    permission: ServerPermission
  ) {
    await this.checkJoinedServer(em, serverId)
    if (!(await this.hasServerPermission(em, serverId, permission)))
      throw new CustomError('error.server.missingPermission', permission)
  }

  async hasChannelPermission(
    em: EntityManager,
    channelId: string,
    channelPermission: ChannelPermission,
    serverPermission: ServerPermission = null
  ): Promise<boolean> {
    if (this.isAdmin) return true
    const channel = await em.findOneOrFail(Channel, ['server.owner'])
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
    channelId: string,
    channelPermission: ChannelPermission,
    serverPermission: ServerPermission | null
  ) {
    const channel = await em.findOneOrFail(Channel, channelId, ['server'])
    await this.checkJoinedServer(em, channel.server.id)
    const hasChannelPermission = await this.hasChannelPermission(
      em,
      channelId,
      channelPermission,
      serverPermission
    )
    if (!hasChannelPermission)
      throw new CustomError(
        'error.channel.missingPermission',
        channelPermission
      )
  }

  async isInGroup(em: EntityManager, groupId: string) {
    const group = await em.findOneOrFail(Group, groupId, ['users'])
    return group.users.contains(this)
  }

  async checkInGroup(em: EntityManager, groupId: string) {
    if (!(await this.isInGroup(em, groupId)))
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

  async checkCanModifyFolder(em: EntityManager, folder: Folder) {
    if (folder.owner) {
      if (folder.owner !== this && !folder.isCollaborative)
        throw new Error('error.folder.notCollaborative')
      if (
        folder.visibility === FolderVisibility.Private &&
        folder.owner !== this
      )
        throw new Error('error.folder.private')
      if (folder.visibility === FolderVisibility.Friends) {
        const friends = (
          await em.find(FriendData, {
            user: this,
            status: FriendStatus.Friends
          })
        ).map(f => f.toUser)
        if (!friends.includes(folder.owner))
          throw new Error('error.folder.notFriends')
      }
    } else {
      await this.checkServerPermission(
        em,
        folder.serverFolder.server.id,
        ServerPermission.AddPostToFolder
      )
    }
  }
}
