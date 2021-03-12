import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  Property
} from '@mikro-orm/core'
import { BaseEntity, Server, User } from '@/entity'
import {
  defaultServerPermissions,
  ServerPermission
} from '@/types/ServerPermission'
import { Lexico } from '@/util/Lexico'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ implements: BaseEntity })
@Entity()
export class ServerRole extends BaseEntity {
  @Field()
  @Property()
  name: string

  @ManyToOne({ entity: () => Server, inversedBy: 'roles' })
  server: Server

  @ManyToMany(() => User, 'roles', { owner: true })
  users = new Collection<User>(this)

  @Property({ default: Lexico.FIRST_POSITION })
  position: string

  @Field()
  @Property({ nullable: true })
  color?: string

  @Enum({
    items: () => ServerPermission,
    array: true,
    default: defaultServerPermissions
  })
  permissions: ServerPermission[] = defaultServerPermissions

  hasPermission(permission: ServerPermission) {
    return this.permissions.includes(permission)
  }
}
