import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { Server, User } from '@/entity'

@Entity()
export class UserBanServer {
  @ManyToOne({ entity: () => User, primary: true })
  user: User

  @ManyToOne({ entity: () => Server, primary: true })
  server: Server;

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()

  @ManyToOne({ entity: () => User })
  bannedBy: User

  @Property({ nullable: true })
  reason?: string
}
