import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity, Server } from '@/entity'
import {
  defaultServerPermissions,
  ServerPermission
} from '@/types/ServerPermission'
import { ReorderUtils } from '@/util/ReorderUtils'
import { Field, ObjectType } from 'type-graphql'

@ObjectType({ implements: BaseEntity })
@Entity()
export class ServerRole extends BaseEntity {
  @Field()
  @Property({ columnType: 'text' })
  name: string

  @ManyToOne({ entity: () => Server, inversedBy: 'roles' })
  server: Server

  @Property({ columnType: 'text' })
  position: string = ReorderUtils.FIRST_POSITION

  @Field()
  @Property({ nullable: true })
  color?: string

  @Enum({
    items: () => ServerPermission,
    array: true
  })
  permissions: ServerPermission[] = defaultServerPermissions

  hasPermission(permission: ServerPermission) {
    return this.permissions.includes(permission)
  }
}
