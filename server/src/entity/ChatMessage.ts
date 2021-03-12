import { Field, ObjectType } from 'type-graphql'
import { User, ChatChannel, BaseEntity, LinkMetadata } from '@/entity'
import { Embedded, Entity, ManyToOne, Property } from '@mikro-orm/core'

@ObjectType({ implements: BaseEntity })
@Entity()
export class ChatMessage extends BaseEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  author: User

  @ManyToOne(() => ChatChannel)
  channel: ChatChannel

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
