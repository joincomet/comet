import { Field, ObjectType } from 'type-graphql'
import {
  User,
  Channel,
  BaseEntity,
  LinkMetadata,
  Group,
  ServerInvite
} from '@/entity'
import {
  Collection,
  Embedded,
  Entity,
  ManyToMany,
  ManyToOne,
  Property
} from '@mikro-orm/core'

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

  @Field()
  @Property({ columnType: 'text' })
  text: string

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
}
