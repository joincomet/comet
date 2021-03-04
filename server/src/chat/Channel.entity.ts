import { Field, ID, ObjectType } from 'type-graphql'
import { Message } from '@/chat/Message.entity'
import { Group } from '@/chat/Group.entity'
import { Server } from '@/server/Server.entity'
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  Property
} from '@mikro-orm/core'
import { BaseEntity } from '@/types/Base.entity'

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

  @ManyToOne({ entity: () => Server, nullable: true, inversedBy: 'channels' })
  server?: Server

  @OneToOne({ entity: () => Group, nullable: true, inversedBy: 'channel' })
  group?: Group

  @Field()
  @Property({ default: false })
  modOnly: boolean
}
