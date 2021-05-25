import { Field, ObjectType } from 'type-graphql'
import {
  Channel,
  Group,
  Image,
  LinkMetadata,
  MessageType,
  ServerUser,
  User
} from '@/entity'
import {
  Collection,
  Embedded,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  Property
} from '@mikro-orm/core'
import { File } from '@/entity/File'
import { BaseEntity } from '@/entity/BaseEntity'

@ObjectType({ implements: BaseEntity })
@Entity()
export class Message extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  author: User

  @Field(() => ServerUser, { nullable: true })
  serverUser?: ServerUser

  @Field(() => Channel, { nullable: true })
  @ManyToOne(() => Channel, { nullable: true })
  channel?: Channel

  @Field(() => Group, { nullable: true })
  @ManyToOne({
    entity: () => Group,
    nullable: true,
    inversedBy: 'messages'
  })
  group?: Group

  @Field(() => User, { nullable: true })
  @ManyToOne({
    entity: () => User,
    nullable: true
  })
  toUser?: User

  @Field({ nullable: true })
  @Property({ columnType: 'text', nullable: true })
  text?: string

  @Field(() => [Image])
  @Embedded(() => Image, { object: true, array: true })
  images: Image[] = []

  @Field({ nullable: true })
  @Embedded(() => File, { object: true, nullable: true })
  file?: File

  @Field(() => [LinkMetadata])
  @Embedded(() => LinkMetadata, { object: true, array: true })
  linkMetadatas: LinkMetadata[] = []

  @Field(() => [User])
  @ManyToMany(() => User)
  mentionedUsers = new Collection<User>(this)

  @Field()
  @Property()
  isEveryoneMentioned: boolean = false

  @Field()
  @Property()
  isPinned: boolean = false

  @Field({ nullable: true })
  @Property({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  @Property({ nullable: true })
  pinnedAt?: Date

  @Field()
  @Property()
  isDeleted: boolean = false

  @Field(() => MessageType)
  @Enum({ items: () => MessageType })
  type: MessageType = MessageType.Normal
}
