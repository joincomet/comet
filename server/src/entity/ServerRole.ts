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
  @Property({ columnType: 'text' })
  name: string

  @ManyToOne({ entity: () => Server, inversedBy: 'roles' })
  server: Server

  @Property({ default: Lexico.FIRST_POSITION, columnType: 'text' })
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
