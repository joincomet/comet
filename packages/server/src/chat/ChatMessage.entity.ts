import { Field, ID, ObjectType } from 'type-graphql'
import { User } from '@/user/User.entity'
import { ChatChannel } from '@/chat/ChatChannel.entity'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { EditableEntity } from '@/Editable.entity'

@ObjectType()
@Entity()
export class ChatMessage extends EditableEntity {
  @Field(() => User)
  @ManyToOne(() => User)
  author: User

  @Field()
  @Property('text')
  text: string

  @ManyToOne(() => ChatChannel)
  channel: ChatChannel

  @Field()
  @Property({ default: false })
  pinned: boolean
}
