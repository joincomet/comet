import {
  Entity,
  Enum,
  ManyToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { Role, Server, User, ServerUserStatus } from '@/entity'
import { ReorderUtils } from '@/util/ReorderUtils'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class ServerUser {
  @Field(() => User)
  @ManyToOne({ entity: () => User, primary: true })
  user: User

  @ManyToOne({ entity: () => Server, primary: true })
  server: Server;

  [PrimaryKeyType]: [string, string]

  @Property({ columnType: 'text' })
  position: string = ReorderUtils.FIRST_POSITION

  @Property()
  createdAt: Date = new Date()

  @Field(() => Role)
  @ManyToOne({ entity: () => Role, inversedBy: 'serverUsers' })
  role: Role

  @Enum({
    items: () => ServerUserStatus
  })
  status: ServerUserStatus = ServerUserStatus.Joined

  @Field(() => ID)
  get id() {
    return `u${this.user.id}-s${this.server.id}`
  }
}
