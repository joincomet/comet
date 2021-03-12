import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity, Server, User } from '@/entity'

@Entity()
export class ServerUserBan extends BaseEntity {
  @ManyToOne({ entity: () => User })
  user: User

  @ManyToOne({ entity: () => Server })
  server: Server

  @ManyToOne({ entity: () => User })
  bannedBy: User

  @Property({ nullable: true })
  reason?: string

  @Property({ default: true })
  isActive: boolean
}
