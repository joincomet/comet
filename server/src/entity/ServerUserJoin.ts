import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { Server, ServerRole, User } from '@/entity'
import { ReorderUtils } from '@/util/ReorderUtils'
import { Field } from 'type-graphql'

@Entity()
export class ServerUserJoin {
  @ManyToOne({ entity: () => User, primary: true })
  user: User

  @ManyToOne({ entity: () => Server, primary: true })
  server: Server;

  [PrimaryKeyType]: [string, string]

  @Property({ columnType: 'text' })
  position: string = ReorderUtils.FIRST_POSITION

  @Property()
  createdAt: Date = new Date()

  @Field(() => [ServerRole])
  @ManyToMany(() => ServerRole)
  roles = new Collection<ServerRole>(this)
}
