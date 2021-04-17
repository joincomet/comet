import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { ChannelPermissions, Server, ServerUser } from '@/entity'
import {
  defaultServerPermissions,
  ServerPermission
} from '@/entity/server/ServerPermission'
import { ReorderUtils } from '@/util/ReorderUtils'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from '@/entity/BaseEntity'

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

  @Field(() => [ChannelPermissions])
  @OneToMany({
    entity: () => ChannelPermissions,
    mappedBy: 'role',
    cascade: [Cascade.ALL]
  })
  channelPermissions = new Collection<ChannelPermissions>(this)

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
    return (
      this.permissions.includes(permission) ||
      this.permissions.includes(ServerPermission.Admin)
    )
  }
}
