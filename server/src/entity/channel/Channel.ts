import { Field, Int, ObjectType } from 'type-graphql'
import {
  ChannelPermission,
  ChannelPermissions,
  Message,
  Server
} from '@/entity'
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property
} from '@mikro-orm/core'
import { ReorderUtils } from '@/util/ReorderUtils'
import { BaseEntity } from '@/entity/BaseEntity'
import { GraphQLNonNegativeInt } from 'graphql-scalars'

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
  position: string = ReorderUtils.FIRST_POSITION

  @Property()
  isPrivate: boolean = false

  @Property()
  isDeleted: boolean = false

  @Property()
  lastMessageAt: Date = new Date()

  @Field(() => GraphQLNonNegativeInt)
  mentionCount: number = 0

  @Field()
  isUnread: boolean = true

  @Field(() => [ChannelPermission])
  permissions: ChannelPermission[]

  @Field(() => [ChannelPermissions])
  rolePermissions: ChannelPermissions[]
}
