import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'
import { BaseEntity, ChannelRole, Server, ServerUser } from '@/entity'
import {
  defaultServerPermissions,
  ServerPermission
} from '@/entity/server/ServerPermission'
import { ReorderUtils } from '@/util/ReorderUtils'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Role extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  name: string

  @ManyToOne({ entity: () => Server, inversedBy: 'roles' })
  server: Server

  @ManyToMany({ entity: () => ServerUser })
  serverUsers = new Collection<ServerUser>(this)

  @Field(() => [ChannelRole])
  @OneToMany({
    entity: () => ChannelRole,
    mappedBy: 'role',
    cascade: [Cascade.ALL]
  })
  channelRoles = new Collection<ChannelRole>(this)

  @Property({ columnType: 'text' })
  position: string = ReorderUtils.FIRST_POSITION

  @Field()
  @Property({ nullable: true })
  color?: string

  @Field(() => [ServerPermission])
  @Enum({
    items: () => ServerPermission,
    array: true
  })
  permissions: ServerPermission[] = defaultServerPermissions

  hasPermission(permission: ServerPermission) {
    return this.permissions.includes(permission)
  }
}
