import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'
import { Server, ServerUser } from '@/entity'
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

  @OneToMany(() => ServerUser, 'role')
  serverUsers = new Collection<ServerUser>(this)

  @Property({ columnType: 'text' })
  position: string = ReorderUtils.FIRST_POSITION

  @Field()
  @Property({ default: false })
  isDefault: boolean = false

  @Field({ nullable: true })
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
