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
import {
  ChannelRolePermissions,
  defaultChannelPermissions
} from '@/entity/ChannelRolePermissions'

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

  @Authorized('USER')
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

  @OneToMany(() => Folder, 'owner')
  folders = new Collection<Folder>(this)

  @OneToMany(() => UserJoinServer, 'user')
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
  ): Promise<Boolean> {
    return Boolean(await em.count(UserBanServer, { server, user: this }))
  }

  async isBannedGlobal(em: EntityManager): Promise<Boolean> {
    return Boolean(await em.count(UserBanGlobal, { user: this }))
  }

  async joinServer(
    server: Server,
    em: EntityManager,
    userJoinedServer: Publisher<UserServerPayload>
  ) {
    const user = this
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
    server: Server,
    em: EntityManager,
    userLeftServer: Publisher<UserServerPayload>
  ) {
    const user = this
    await em.findOneOrFail(UserJoinServer, { server, user })
    server.userCount--
    await em.nativeDelete(UserJoinServer, { server, user })
    await em.persistAndFlush(server)
    await userLeftServer({ server, user })
  }

  async hasServerPermission(
    permission: ServerPermission,
    server: Server,
    em: EntityManager
  ) {
    const user = this
    if (user.admin) return true
    await em.populate(user, ['roles'])
    await em.populate(server, ['owner'])
    return (
      server.owner === user ||
      !!user.roles
        .getItems()
        .find(
          role =>
            role.server === server &&
            (role.permissions.includes(ServerPermission.Admin) ||
              role.permissions.includes(permission))
        )
    )
  }

  async hasServerPermissions(
    permissions: ServerPermission[],
    server: Server,
    em: EntityManager
  ) {
    const user = this
    if (user.admin) return true
    await em.populate(user, ['roles'])
    await em.populate(server, ['owner'])
    return (
      server.owner === user ||
      !!user.roles
        .getItems()
        .find(
          role =>
            role.server === server &&
            (role.permissions.includes(ServerPermission.Admin) ||
              role.permissions.every(permission =>
                permissions.includes(permission)
              ))
        )
    )
  }

  async hasChannelPermission(
    permission: ChannelPermission,
    channel: ChatChannel,
    em: EntityManager
  ) {
    const user = this
    if (user.admin) return true
    await em.populate(user, ['roles'])
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
    if (channelRoles.length === 0)
      return defaultChannelPermissions.includes(permission)
    return (
      !!user.roles
        .getItems()
        .find(
          role =>
            role.server === channel.server &&
            role.permissions.includes(ServerPermission.Admin)
        ) || !!channelRoles.find(role => role.permissions.includes(permission))
    )
  }

  async hasChannelPermissions(
    permissions: ChannelPermission[],
    channel: ChatChannel,
    em: EntityManager
  ) {
    const user = this
    if (user.admin) return true
    await em.populate(user, ['roles'])
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
    if (channelRoles.length === 0)
      return permissions.every(permission =>
        defaultChannelPermissions.includes(permission)
      )
    return (
      !!user.roles
        .getItems()
        .find(
          role =>
            role.server === channel.server &&
            role.permissions.includes(ServerPermission.Admin)
        ) ||
      !!channelRoles.find(role =>
        role.permissions.every(permission => permissions.includes(permission))
      )
    )
  }
}
