import { Authorized, Field, ObjectType } from 'type-graphql'
import {
  Collection,
  Entity,
  Enum,
  Formula,
  ManyToMany,
  OneToMany,
  Property,
  QueryOrder,
  Unique
} from '@mikro-orm/core'
import { BaseEntity } from '@/entity/BaseEntity'
import {
  Channel,
  ChannelPermission,
  ChannelRole,
  Folder,
  FolderVisibility,
  Group,
  Relationship,
  RelationshipStatus,
  Server,
  ServerPermission,
  ServerUser,
  UserFolder
} from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import { CustomError } from '@/types/CustomError'
import { ServerUserStatus } from '@/entity/server/ServerUserStatus'
import { OnlineStatus } from '@/entity/user/OnlineStatus'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'

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

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  avatarUrl?: string

  @Field(() => OnlineStatus)
  @Enum({
    items: () => OnlineStatus
  })
  onlineStatus: OnlineStatus = OnlineStatus.Online

  @Field()
  @Property()
  isAdmin: boolean = false

  @Property({ columnType: 'text' })
  passwordHash: string

  @Property()
  isDeleted: boolean = false

  @Property()
  isBanned: boolean = false

  @Property({ nullable: true, columnType: 'text' })
  banReason?: string

  @Property({ nullable: true })
  purchasedPremiumAt?: Date

  @OneToMany(() => UserFolder, 'user', {
    orderBy: { position: QueryOrder.ASC }
  })
  userFolders = new Collection<UserFolder>(this)

  @OneToMany(() => ServerUser, 'user', {
    orderBy: { position: QueryOrder.ASC }
  })
  serverJoins = new Collection<ServerUser>(this)

  @ManyToMany(() => Group, group => group.users, {
    orderBy: { lastMessageAt: QueryOrder.DESC }
  })
  groups = new Collection<Group>(this)

  @OneToMany(() => Relationship, 'owner')
  relationships = new Collection<Relationship>(this)

  @Authorized('USER')
  @Field(() => [Folder], { nullable: true })
  folders?: Folder[]

  @Field()
  get isOnline(): boolean {
    if (!this.lastLoginAt) return false
    const timeout = 5 * 60 * 1000 // five minutes
    return new Date().getTime() - this.lastLoginAt.getTime() < timeout
  }

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

  async leaveServer(
    em: EntityManager,
    serverId: string,
    liveQueryStore: InMemoryLiveQueryStore
  ) {
    const server = await em.findOneOrFail(Server, serverId, ['owner'])
    if (server.owner === this) throw new Error('error.server.owner')
    const join = await em.findOneOrFail(ServerUser, {
      server,
      user: this,
      status: ServerUserStatus.Joined
    })
    server.userCount--
    join.status = ServerUserStatus.None
    await em.persistAndFlush([server, join])
    liveQueryStore.invalidate(`Query.getJoinedServers(id:"${this.id}")`)
  }

  async hasServerPermission(
    em: EntityManager,
    serverId: string,
    permission: ServerPermission
  ): Promise<boolean> {
    if (this.isAdmin) return true
    const server = await em.findOneOrFail(Server, serverId, ['owner'])
    if (server.owner === this) return true
    const serverUser = await em.findOne(
      ServerUser,
      { server, user: this, status: ServerUserStatus.Joined },
      ['roles']
    )
    if (!serverUser) return false
    const roles = serverUser.roles.getItems()
    return !!roles.find(r => r.hasPermission(permission))
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
    const serverUser = await em.findOne(
      ServerUser,
      { server: channel.server, user: this, status: ServerUserStatus.Joined },
      ['roles']
    )
    if (!serverUser) return false
    const userRoles = serverUser.roles.getItems()
    const channelRoles = await em.find(
      ChannelRole,
      {
        channel,
        role: userRoles
      },
      { orderBy: { role: { position: QueryOrder.ASC } } }
    )
    const hasServerPerm =
      !!serverPermission &&
      !!userRoles.find(role => role.hasPermission(serverPermission))
    const channelRole = channelRoles.find(
      channelRole =>
        channelRole.deniedPermissions.includes(channelPermission) ||
        channelRole.allowedPermissions.includes(channelPermission)
    )
    if (!channelRole) return hasServerPerm
    return channelRole.allowedPermissions.includes(channelPermission)
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
    const user = await em.findOneOrFail(User, userId)
    let myData = await em.findOne(Relationship, { owner: this, user })
    let theirData = await em.findOne(Relationship, {
      owner: user,
      user: this
    })

    if (!myData) {
      myData = em.create(Relationship, {
        owner: this,
        user
      })
    }
    if (!theirData) {
      theirData = em.create(Relationship, {
        owner: user,
        user: this
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
          await em.find(Relationship, {
            user: this,
            status: RelationshipStatus.Friends
          })
        ).map(f => f.user)
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
