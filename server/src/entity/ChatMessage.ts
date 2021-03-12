import { Field, ObjectType } from 'type-graphql'
import {
  User,
  ChatChannel,
  BaseEntity,
  LinkMetadata,
  ChatGroup,
  DirectMessage
} from '@/entity'
import {
  Embedded,
  Entity,
  ManyToOne,
  OneToOne,
  Property
} from '@mikro-orm/core'

@ObjectType({ implements: BaseEntity })
@Entity()
export class ChatMessage extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  author: User

  @ManyToOne(() => ChatChannel, { nullable: true })
  channel?: ChatChannel

  @ManyToOne({
    entity: () => ChatGroup,
    nullable: true,
    inversedBy: 'messages'
  })
  group?: ChatGroup

  @ManyToOne({
    entity: () => DirectMessage,
    nullable: true,
    inversedBy: 'messages'
  })
  directMessage?: DirectMessage

  @Field()
  @Property()
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
