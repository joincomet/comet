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
import { BaseEntity, ChatChannel, ChatGroup, Folder, Server } from '@/entity'
import { EntityManager } from '@mikro-orm/postgresql'
import { UserBanServer } from '@/entity/UserBanServer'
import { UserBanGlobal } from '@/entity/UserBanGlobal'
import { UserJoinServer } from '@/entity/UserJoinServer'
import { UserServerPayload } from '@/resolver/server'
import { ServerRole } from '@/entity/ServerRole'
import { ServerPermission } from '@/types/ServerPermission'
import { ChannelPermission } from '@/types/ChannelPermission'
import { ChannelRolePermissions } from '@/entity/ChannelRolePermissions'
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
  deleted: boolean

  @Field()
  @Property({ default: false })
  admin: boolean

  @OneToMany(() => Folder, 'owner', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  folders = new Collection<Folder>(this)

  @OneToMany(() => UserJoinServer, 'user', {
    orderBy: { position: QueryOrder.ASC, createdAt: QueryOrder.DESC }
  })
  serverJoins = new Collection<UserJoinServer>(this)

  @ManyToMany(() => ChatGroup, group => group.users, {
    orderBy: { updatedAt: QueryOrder.DESC }
  })
  groups = new Collection<ChatGroup>(this)

  @Field({ nullable: true })
  @Property({ nullable: true })
  avatarUrl?: string

  @Field()
  isCurrentUser: boolean

  @ManyToMany(() => ServerRole, 'users')
  roles = new Collection<ServerRole>(this)

  async isBannedFromServer(
    server: Server,
    em: EntityManager
  ): Promise<boolean> {
    return Boolean(await em.count(UserBanServer, { server, user: this }))
  }

  async hasJoinedServer(em: EntityManager, server: Server): Promise<boolean> {
    return Boolean(await em.count(UserJoinServer, { server, user: this }))
  }

  async checkJoinedServer(server: Server, em: EntityManager) {
    if (!(await this.hasJoinedServer(em, server)))
      throw new Error('You have not joined this server')
  }

  async isBannedGlobal(em: EntityManager): Promise<boolean> {
    return Boolean(await em.count(UserBanGlobal, { user: this }))
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
    const ban = em.create(UserBanServer, {
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
    const ban = await em.findOneOrFail(UserBanServer, { user: this, server })
    await em.remove(ban)
  }

  async joinServer(
    em: EntityManager,
    server: Server,
    userJoinedServer: Publisher<UserServerPayload>
  ) {
    const user = this
    await user.checkBannedFromServer(em, server)
    if ((await em.count(UserJoinServer, { user })) >= 100)
      throw new Error('Cannot join more than 100 servers')

    let serverJoin = await em.findOne(UserJoinServer, { server, user })
    if (serverJoin) throw new Error('You have already joined this server')
    serverJoin = em.create(UserJoinServer, { server, user })
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
    const join = await em.findOneOrFail(UserJoinServer, { server, user })
    server.userCount--
    await em.remove(join)
    await em.persistAndFlush(server)
    await userLeftServer({ server, user })
  }

  async hasServerPermission(
    em: EntityManager,
    permission: ServerPermission,
    server: Server
  ): Promise<boolean> {
    if (this.admin) return true
    if (!(await this.hasJoinedServer(em, server))) return false
    await em.populate(server, ['owner', 'roles'])
    if (server.owner === this) return true
    const serverRoles = server.roles.getItems()
    const userRoles = this.roles
      .getItems()
      .filter(role => serverRoles.includes(role))
    return !!userRoles.find(
      role =>
        role.permissions.includes(ServerPermission.ServerAdmin) ||
        role.permissions.includes(permission)
    )
  }

  async checkServerPermission(
    em: EntityManager,
    permission: ServerPermission,
    server: Server
  ) {
    await this.checkJoinedServer(server, em)
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
    if (user.admin) return true
    await em.populate(channel, ['server.owner'])
    if (channel.server.owner === user) return true
    if (!(await this.hasJoinedServer(em, channel.server))) return false
    await em.populate(user, ['roles'])
    const roles = user.roles
      .getItems()
      .filter(role => role.server === channel.server)
    if (
      !!roles.find(role =>
        role.permissions.includes(ServerPermission.ServerAdmin)
      )
    )
      return true
    const channelRoles = await em.find(ChannelRolePermissions, {
      $and: [
        {
          channel,
          role: {
            $in: user.roles.getItems()
          }
        }
      ]
    })
    return !!channelRoles.find(
      channelRole =>
        !channelRole.deniedPermissions.includes(channelPermission) &&
        (channelRole.allowedPermissions.includes(channelPermission) ||
          (serverPermission &&
            !!roles.find(role => role.permissions.includes(serverPermission))))
    )
  }

  async checkChannelPermission(
    em: EntityManager,
    channelPermission: ChannelPermission,
    serverPermission: ServerPermission | null,
    channel: ChatChannel
  ) {
    await em.populate(channel, ['server'])
    await this.checkJoinedServer(channel.server, em)
    const hasChannelPermission = await this.hasChannelPermission(
      em,
      channelPermission,
      serverPermission,
      channel
    )
    if (!hasChannelPermission)
      throw new Error(`Missing channel permission ${channelPermission}`)
  }
}
