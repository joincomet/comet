import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  PrimaryKeyType,
  Property,
  QueryOrder
} from '@mikro-orm/core'
import { Role, Server, User } from '@/entity'
import { ReorderUtils } from '@/util/ReorderUtils'
import { Field, ObjectType } from 'type-graphql'
import { NotificationSetting } from '@/types/NotificationSetting'
import { ServerUserStatus } from '@/entity/server/ServerUserStatus'

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

  @Field(() => [Role])
  @ManyToMany({
    entity: () => Role,
    owner: true,
    mappedBy: 'serverUsers',
    orderBy: { position: QueryOrder.ASC }
  })
  roles = new Collection<Role>(this)

  @Enum({ items: () => NotificationSetting })
  notificationSetting: NotificationSetting = NotificationSetting.Mentions

  @Enum({
    items: () => ServerUserStatus
  })
  status: ServerUserStatus = ServerUserStatus.Joined

  @Field({ nullable: true })
  @Property({ nullable: true })
  nickname: string

  @Field()
  get name(): string {
    if (this.nickname) return this.nickname
    return this.user.name
  }

  @Field({ nullable: true })
  get color(): string {
    if (!this.roles || !this.roles.isInitialized() || this.roles.length === 0)
      return null
    return this.roles[0].color
  }
}
