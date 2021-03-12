import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity, Server, User } from '@/entity'
import { Lexico } from '@/util/Lexico'

@Entity()
export class ServerUserJoin extends BaseEntity {
  @ManyToOne({ entity: () => User })
  user: User

  @ManyToOne({ entity: () => Server })
  server: Server

  @Property({ default: Lexico.FIRST_POSITION })
  position: string

  @Property({ default: true })
  isActive: boolean
}
