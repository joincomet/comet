import { Field, ID, ObjectType } from 'type-graphql'
import { User } from '@/user/User.entity'
import { Channel } from '@/chat/Channel.entity'
import { Embedded, Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from '@/types/Base.entity'
import { Metadata } from '@/metascraper/Metadata.entity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Message extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  author: User

  @Field()
  @Property()
  text: string

  @ManyToOne(() => Channel)
  channel: Channel

  @Field()
  @Property({ default: false })
  pinned: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  editedAt?: Date

  @Field()
  @Property({ default: false })
  deleted: boolean

  @Field()
  @Property({ default: false })
  removed: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  removedReason?: string

  @Field(() => [Metadata])
  @Embedded(() => Metadata, { object: true, array: true })
  metas: Metadata[] = []
}
