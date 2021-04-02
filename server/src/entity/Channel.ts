import { Field, Int, ObjectType } from 'type-graphql'
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

  @Field(() => Server)
  @ManyToOne({ entity: () => Server, inversedBy: 'channels' })
  server: Server

  @Property({ columnType: 'text' })
  position: string = Lexico.FIRST_POSITION

  @Property()
  isPrivate: boolean = false

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastMessageAt?: Date

  @Field()
  isUnread: boolean = false

  @Field(() => Int)
  mentionCount: number = 0
}
