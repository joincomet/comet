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
import { ServerPermission } from '@/types/ServerPermission'

export const defaultServerPermissions = [
  ServerPermission.ViewChannels,
  ServerPermission.CreateInvite,
  ServerPermission.ChangeNickname,
  ServerPermission.SendMessages,
  ServerPermission.EmbedLinks,
  ServerPermission.AttachFiles
]

@Entity()
export class ServerRole {
  @ManyToOne({ entity: () => Server, primary: true })
  server: Server

  @PrimaryKey()
  name: string

  @ManyToMany(() => User, 'roles', { owner: true })
  users = new Collection<User>(this);

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()

  @Property({ nullable: true })
  color?: string

  @Enum({
    items: () => ServerPermission,
    array: true,
    default: defaultServerPermissions
  })
  permissions: ServerPermission[] = defaultServerPermissions
}
