import { Field, ID, ObjectType } from 'type-graphql'
import { User } from '@/entity/User'
import { ChatChannel } from '@/entity/ChatChannel'
import { Embedded, Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from '@/entity/BaseEntity'
import { LinkEmbed } from '@/entity/LinkEmbed'

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

  @Field(() => [LinkEmbed])
  @Embedded(() => LinkEmbed, { object: true, array: true })
  linkEmbeds: LinkEmbed[] = []
}
