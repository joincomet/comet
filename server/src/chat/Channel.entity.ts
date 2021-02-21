import { Field, ID, ObjectType } from 'type-graphql'
import { Message } from '@/chat/Message.entity'
import { Group } from '@/chat/Group.entity'
import { Planet } from '@/planet/Planet.entity'
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property
} from '@mikro-orm/core'
import { BaseEntity } from '@/Base.entity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Channel extends BaseEntity {
  @Field({ nullable: true })
  @Property({ nullable: true })
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  description: string

  @OneToMany(() => Message, 'channel')
  messages = new Collection<Message>(this)

  @ManyToOne(() => Planet)
  planet: Planet

  @OneToOne({ entity: () => Group, nullable: true, inversedBy: 'channel' })
  group: Group

  @Field()
  @Property({ default: false })
  modOnly: boolean
}
