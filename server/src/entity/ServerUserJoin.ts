import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { Server, User } from '@/entity'
import { Lexico } from '@/util/Lexico'

@Entity()
export class ServerUserJoin {
  @ManyToOne({ entity: () => User, primary: true })
  user: User

  @ManyToOne({ entity: () => Server, primary: true })
  server: Server;

  [PrimaryKeyType]: [string, string]

  @Property({ default: Lexico.FIRST_POSITION, columnType: 'text' })
  position: string

  @Property()
  createdAt: Date = new Date()
}
