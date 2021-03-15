import { Field, ObjectType } from 'type-graphql'
import {
  User,
  Channel,
  BaseEntity,
  LinkMetadata,
  Group,
  DirectMessage
} from '@/entity'
import { Embedded, Entity, ManyToOne, Property } from '@mikro-orm/core'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Message extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  author: User

  @ManyToOne(() => Channel, { nullable: true })
  channel?: Channel

  @ManyToOne({
    entity: () => Group,
    nullable: true,
    inversedBy: 'messages'
  })
  group?: Group

  @ManyToOne({
    entity: () => DirectMessage,
    nullable: true,
    inversedBy: 'messages'
  })
  directMessage?: DirectMessage

  @Field()
  @Property({ columnType: 'text' })
  text: string

  @Field(() => [LinkMetadata])
  @Embedded(() => LinkMetadata, { object: true, array: true })
  linkMetadatas: LinkMetadata[] = []

  @Field()
  @Property({ default: false })
  isPinned: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  editedAt?: Date

  @Field()
  @Property({ default: false })
  isDeleted: boolean

  @Field()
  @Property({ default: false })
  isRemoved: boolean
}
