import { Field, ObjectType } from 'type-graphql'
import { ChatMessage, Server, BaseEntity } from '@/entity'
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'
import { Lexico } from '@/util/Lexico'

@ObjectType({ implements: BaseEntity })
@Entity()
export class ChatChannel extends BaseEntity {
  @Field({ nullable: true })
  @Property({ nullable: true })
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true })
  description?: string

  @OneToMany(() => ChatMessage, 'channel')
  messages = new Collection<ChatMessage>(this)

  @ManyToOne({ entity: () => Server, inversedBy: 'channels' })
  server: Server

  @Property({ default: Lexico.FIRST_POSITION })
  position: string
}
