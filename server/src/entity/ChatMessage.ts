import { Field, ObjectType } from 'type-graphql'
import { User, ChatChannel, BaseEntity, LinkMetadata } from '@/entity'
import { Embedded, Entity, ManyToOne, Property } from '@mikro-orm/core'

@ObjectType({ implements: BaseEntity })
@Entity()
export class ChatMessage extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  author: User

  @Field()
  @Property()
  text: string

  @ManyToOne(() => ChatChannel)
  channel: ChatChannel

  @Field()
  @Property({ default: false })
  pinned: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  editedAt?: Date

  @Field()
  @Property({ default: false })
  deleted: boolean

  @Field()
  @Property({ default: false })
  removed: boolean

  @Field({ nullable: true })
  @Property({ nullable: true })
  removedReason?: string

  @Field(() => [LinkMetadata])
  @Embedded(() => LinkMetadata, { object: true, array: true })
  linkMetadatas: LinkMetadata[] = []
}
