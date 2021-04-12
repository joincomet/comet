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
  Server,
  ServerUser,
  UserFolder
} from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import { ChannelPermission, ServerPermission } from '@/types'
import { CustomError } from '@/types/CustomError'
import { FolderVisibility } from '@/resolver/folder'
import { FriendStatus } from '@/resolver/user'
import { UserServerPayload } from '@/resolver/server/subscriptions'
import { ReorderUtils } from '@/util'
import { ServerUserStatus } from '@/resolver/server/types/ServerUserStatus'

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

  @OneToMany(() => ServerUser, 'user', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  serverJoins = new Collection<ServerUser>(this)

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
    return !!(await em.count(ServerUser, {
      server: serverId,
      user: this,
      status: ServerUserStatus.Banned
    }))
  }

  async hasJoinedServer(em: EntityManager, serverId: string): Promise<boolean> {
    return !!(await em.count(ServerUser, {
      server: serverId,
      user: this,
      status: ServerUserStatus.Joined
    }))
  }

  async checkJoinedServer(em: EntityManager, serverId: string) {
    if (!(await this.hasJoinedServer(em, serverId)))
      throw new Error('error.server.notJoined')
  }

  async checkBannedFromServer(em: EntityManager, serverId: string) {
    if (await this.isBannedFromServer(em, serverId))
      throw new Error('error.server.banned')
  }

  async joinServer(
    em: EntityManager,
    serverId: string,
    notifyUserJoinedServer: Publisher<UserServerPayload>
  ): Promise<Server> {
    await this.checkBannedFromServer(em, serverId)
    const server = await em.findOneOrFail(Server, serverId)
    const firstServerJoin = await em.findOne(
      ServerUser,
      { server, user: this },
      ['server'],
      { position: QueryOrder.ASC }
    )
    const join = em.create(ServerUser, {
      server,
      user: this,
      position: firstServerJoin
        ? ReorderUtils.positionBefore(firstServerJoin.position)
        : ReorderUtils.FIRST_POSITION
    })
    await em.persistAndFlush(join)
    await notifyUserJoinedServer({ userId: this.id, serverId })
    return server
  }

  async leaveServer(
    em: EntityManager,
    serverId: string,
    notifyUserLeftServer: Publisher<UserServerPayload>
  ) {
    const server = await em.findOneOrFail(Server, serverId, ['owner'])
    if (server.owner === this) throw new Error('error.server.owner')
    const join = await em.findOneOrFail(ServerUser, { server, user: this })
    server.userCount--
    join.status = ServerUserStatus.None
    await em.persistAndFlush([server, join])
    await notifyUserLeftServer({ userId: this.id, serverId: server.id })
  }

  async hasServerPermission(
    em: EntityManager,
    serverId: string,
    permission: ServerPermission
  ): Promise<boolean> {
    if (this.isAdmin) return true
    const server = await em.findOneOrFail(Server, serverId, ['owner'])
    if (server.owner === this) return true
    const join = await em.findOne(ServerUser, { server, user: this }, ['roles'])
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
      ServerUser,
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
    const friend = await em.findOneOrFail(User, userId)
    let myData = await em.findOne(FriendData, { user: this, friend })
    let theirData = await em.findOne(FriendData, {
      user: friend,
      friend: this
    })

    if (!myData) {
      myData = em.create(FriendData, {
        user: this,
        friend
      })
    }
    if (!theirData) {
      theirData = em.create(FriendData, {
        user: friend,
        friend: this
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
        ).map(f => f.friend)
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
