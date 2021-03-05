import { Field, ID, ObjectType } from 'type-graphql'
import { ChatMessage } from '@/entity/ChatMessage'
import { ChatGroup } from '@/entity/ChatGroup'
import { Server } from '@/entity/Server'
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property
} from '@mikro-orm/core'
import { BaseEntity } from '@/entity/BaseEntity'

@ObjectType({ implements: BaseEntity })
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

  @ManyToOne({ entity: () => Server, nullable: true, inversedBy: 'channels' })
  server?: Server

  @OneToOne({ entity: () => ChatGroup, nullable: true, inversedBy: 'channel' })
  group?: ChatGroup

  @Field()
  @Property({ default: false })
  modOnly: boolean
}
