import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  PrimaryKeyType,
  Property
} from '@mikro-orm/core'
import { Server, ServerRole, User } from '@/entity'
import { ReorderUtils } from '@/util/ReorderUtils'
import { Field } from 'type-graphql'
import { NotificationSetting } from '@/types/NotificationSetting'
import { ServerUserStatus } from '@/resolver/server/types/ServerUserStatus'

@Entity()
export class ServerUser {
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

  @Field(() => NotificationSetting)
  @Enum({ items: () => NotificationSetting })
  notificationSetting: NotificationSetting = NotificationSetting.Mentions

  @Enum({
    items: () => ServerUserStatus
  })
  status: ServerUserStatus = ServerUserStatus.Joined
}
