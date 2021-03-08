import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { Server, User } from '@/entity'
import {
  defaultServerPermissions,
  ServerPermission
} from '@/types/ServerPermission'
import { Lexico } from '@/util/Lexico'

@Entity()
export class ServerRole {
  @ManyToOne({ entity: () => Server, primary: true, inversedBy: 'roles' })
  server: Server

  @PrimaryKey()
  name: string

  @ManyToMany(() => User, 'roles', { owner: true })
  users = new Collection<User>(this);

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()

  @Property({ default: Lexico.FIRST_POSITION })
  position: string

  @Property({ nullable: true })
  color?: string

  @Enum({
    items: () => ServerPermission,
    array: true,
    default: defaultServerPermissions
  })
  permissions: ServerPermission[] = defaultServerPermissions
}
