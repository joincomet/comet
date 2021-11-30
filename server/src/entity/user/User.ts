import { Authorized, Field, ObjectType } from 'type-graphql'
import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  OneToMany,
  Property,
  QueryOrder
} from '@mikro-orm/core'
import { BaseEntity } from '@/entity/BaseEntity'
import {
  Folder,
  FolderVisibility,
  Group,
  GroupUser,
  Relationship,
  RelationshipStatus,
  Server,
  ServerPermission,
  ServerUser,
  UserFolder,
  ServerUserStatus,
  OnlineStatus
} from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import { CustomError } from '@/types/CustomError'
import { InMemoryLiveQueryStore } from '@n1ru4l/in-memory-live-query-store'
import { GraphQLEmailAddress, GraphQLNonNegativeInt } from 'graphql-scalars'
import { Color } from '@/types'
import {logger, randomEnum} from '@/util'

@ObjectType({ implements: BaseEntity })
@Entity()
export class User extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  username: string

  @Authorized('USER')
  @Field(() => GraphQLEmailAddress, { nullable: true })
  @Property({ columnType: 'text', nullable: true })
  email: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastLoginAt?: Date

  @Field({ nullable: true })
  lastMessageAt?: Date

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

  @Field(() => Color)
  @Enum({ items: () => Color })
  color: Color = randomEnum(Color)

  @Field()
  isCurrentUser: boolean

  @Property({ columnType: 'text' })
  passwordHash: string

  @Property()
  isDeleted: boolean = false

  @Property()
  isBanned: boolean = false

  @Property({ nullable: true, columnType: 'text' })
  banReason?: string

  @OneToMany(() => UserFolder, 'user', {
    orderBy: { position: QueryOrder.ASC }
  })
  userFolders = new Collection<UserFolder>(this)

  @OneToMany(() => ServerUser, 'user', {
    orderBy: { position: QueryOrder.ASC }
  })
  serverUsers = new Collection<ServerUser>(this)

  @OneToMany(() => GroupUser, 'user', {
    orderBy: { lastMessageAt: QueryOrder.DESC }
  })
  groupUsers = new Collection<GroupUser>(this)

  @Field(() => [Group])
  @ManyToMany(() => Group, 'users')
  groups: Group[]

  @OneToMany(() => Relationship, 'owner')
  relationships = new Collection<Relationship>(this)

  @Field(() => [User])
  relatedUsers: User[]

  @Field(() => [Folder])
  folders: Folder[]

  @Field(() => [Server])
  servers: Server[]

  @Field(() => GraphQLNonNegativeInt)
  unreadCount: number

  @Field()
  showChat: boolean

  @Field(() => RelationshipStatus)
  relationshipStatus: RelationshipStatus

  @Field()
  @Property({ default: false })
  isOg: boolean = false

  @Field()
  @Property({ default: false })
  isStaff: boolean = false

  @Field()
  get isOnline(): boolean {
    if (!this.lastLoginAt) return false
    const timeout = 5 * 60 * 1000 // five minutes
    return new Date().getTime() - this.lastLoginAt.getTime() < timeout
  }

  async isBannedFromServer(
    em: EntityManager,
    serverId: string
  ): Promise<boolean> {
    logger('isBannedFromServer')
    return !!(await em.count(ServerUser, {
      server: serverId,
      user: this,
      status: ServerUserStatus.Banned
    }))
  }

  async hasJoinedServer(em: EntityManager, serverId: string): Promise<boolean> {
    logger('hasJoinedServer')
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

  async hasServerPermission(
    em: EntityManager,
    serverId: string,
    permission: ServerPermission
  ): Promise<boolean> {
    logger('hasServerPermission')
    if (this.isAdmin) return true
    const server = await em.findOneOrFail(Server, serverId, ['owner'])
    if (server.owner === this) return true
    const serverUser = await em.findOne(
      ServerUser,
      { server, user: this, status: ServerUserStatus.Joined },
      ['role']
    )
    if (!serverUser) return false
    return serverUser.role.hasPermission(permission)
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

  async isInGroup(em: EntityManager, groupId: string) {
    logger('isInGroup')
    const group = await em.findOneOrFail(Group, groupId, ['users'])
    return group.users.contains(this)
  }

  async checkInGroup(em: EntityManager, groupId: string) {
    if (!(await this.isInGroup(em, groupId))) throw new Error('Not in group')
  }

  async getFriendData(
    em: EntityManager,
    userId: string
  ): Promise<[Relationship, Relationship]> {
    logger('getFriendData')
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

  async checkCanAddToFolder(
    em: EntityManager,
    folderId: string
  ): Promise<void> {
    logger('checkCanAddToFolder')
    const folder = await em.findOneOrFail(Folder, folderId, ['owner', 'server'])
    if (folder.owner && folder.owner !== this) {
      if (!folder.isCollaborative)
        throw new Error('That folder is not collaborative')
      if (folder.visibility === FolderVisibility.Private)
        throw new Error('That folder is private')
      if (folder.visibility === FolderVisibility.Friends) {
        const relationship = await em.findOne(Relationship, {
          owner: this,
          user: folder.owner
        })
        if (relationship?.status !== RelationshipStatus.Friends)
          throw new Error('That folder is visible to friends only')
      }
    } else if (folder.server) {
      await this.checkServerPermission(
        em,
        folder.server.id,
        ServerPermission.AddPostToFolder
      )
    }
  }

  async checkCanViewFolder(em: EntityManager, folderId: string): Promise<void> {
    logger('checkCanViewFolder')
    const folder = await em.findOneOrFail(Folder, folderId, ['owner', 'server'])
    if (folder.owner && folder.owner !== this) {
      if (folder.visibility === FolderVisibility.Private)
        throw new Error('That folder is private')
      if (folder.visibility === FolderVisibility.Friends) {
        const relationship = await em.findOne(Relationship, {
          owner: this,
          user: folder.owner
        })
        if (relationship?.status !== RelationshipStatus.Friends)
          throw new Error('That folder is visible to friends only')
      }
    } else if (folder.server) {
      await this.checkJoinedServer(em, folder.server.id)
    }
  }
}
