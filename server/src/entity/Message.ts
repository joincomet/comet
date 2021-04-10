import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Channel,
  Group,
  Image,
  LinkMetadata,
  ServerInvite,
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
import { NotificationSetting } from '@/types/NotificationSetting'
import { MessageType } from '@/resolver/message'

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
    entity: () => User,
    nullable: true
  })
  toUser?: User

  @Field({ nullable: true })
  @Property({ columnType: 'text', nullable: true })
  text?: string

  @Field({ nullable: true })
  @Embedded(() => Image, { object: true, nullable: true })
  image?: Image

  @Field({ nullable: true })
  @Embedded(() => File, { object: true, nullable: true })
  file?: File

  @Field(() => [LinkMetadata])
  @Embedded(() => LinkMetadata, { object: true, array: true })
  linkMetadatas: LinkMetadata[] = []

  @ManyToMany(() => ServerInvite)
  invites = new Collection<ServerInvite>(this)

  @Field()
  @Property()
  isPinned: boolean = false

  @Field({ nullable: true })
  @Property({ nullable: true })
  editedAt?: Date

  @Field()
  @Property()
  isDeleted: boolean = false

  @Field(() => MessageType)
  @Enum({ items: () => MessageType })
  type: MessageType = MessageType.Normal
}
