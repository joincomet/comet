import { Field, ObjectType } from 'type-graphql'
import { Message, Server, BaseEntity } from '@/entity'
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
export class Channel extends BaseEntity {
  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  name: string

  @Field({ nullable: true })
  @Property({ nullable: true, columnType: 'text' })
  description?: string

  @OneToMany(() => Message, 'channel')
  messages = new Collection<Message>(this)

  @ManyToOne({ entity: () => Server, inversedBy: 'channels' })
  server: Server

  @Property({ default: Lexico.FIRST_POSITION, columnType: 'text' })
  position: string

  @Property({ default: false })
  isPrivate: boolean

  @Property({ nullable: true })
  lastMessageAt?: Date
}
