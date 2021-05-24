import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'
import {
  Server,
  ServerUser,
  defaultServerPermissions,
  ServerPermission
} from '@/entity'
import { Field, ObjectType } from 'type-graphql'
import { BaseEntity } from '@/entity/BaseEntity'
import { GraphQLHexColorCode } from 'graphql-scalars'

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

  @Field()
  @Property()
  isDefault: boolean = false

  @Field(() => GraphQLHexColorCode, { nullable: true })
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
