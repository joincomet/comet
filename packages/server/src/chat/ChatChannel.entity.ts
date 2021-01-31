import { Field, ID, ObjectType } from 'type-graphql'
import { ChatMessage } from '@/chat/ChatMessage.entity'
import { ChatGroup } from '@/chat/ChatGroup.entity'
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

@ObjectType()
@Entity()
export class ChatChannel extends BaseEntity {
  @Field({ nullable: true })
  @Property({ nullable: true })
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  description: string

  @OneToMany(() => ChatMessage, 'channel')
  messages = new Collection<ChatMessage>(this)

  @ManyToOne(() => Planet)
  planet: Planet

  @OneToOne({ entity: () => ChatGroup, nullable: true, inversedBy: 'channel' })
  group: ChatGroup
}
