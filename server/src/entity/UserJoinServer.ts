import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { Server, User } from '@/entity'

@Entity()
export class UserJoinServer {
  @ManyToOne({ entity: () => User, primary: true })
  user: User

  @ManyToOne({ entity: () => Server, primary: true })
  server: Server;

  [PrimaryKeyType]: [string, string]

  @Property()
  createdAt: Date = new Date()

  @Property({ default: 0 })
  rank: number
}
