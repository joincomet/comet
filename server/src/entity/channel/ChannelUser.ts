import { Entity, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core'
import { Channel, User } from '@/entity'

@Entity()
export class ChannelUser {
  @ManyToOne({ entity: () => User, primary: true })
  user: User

  @ManyToOne({ entity: () => Channel, primary: true })
  channel: Channel;

  [PrimaryKeyType]: [string, string]

  @Property()
  lastViewAt: Date = new Date()

  @Property()
  mentionCount: number = 0
}
