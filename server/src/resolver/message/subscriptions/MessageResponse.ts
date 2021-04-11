import { Field, ID, ObjectType } from 'type-graphql'
import { Message } from '@/entity'

@ObjectType()
export class MessageResponse {
  @Field(() => ID, { nullable: true })
  userId?: string

  @Field(() => ID, { nullable: true })
  groupId?: string

  @Field(() => ID, { nullable: true })
  channelId?: string

  @Field(() => ID, { nullable: true })
  serverId?: string

  @Field(() => Message)
  message: Message
}
