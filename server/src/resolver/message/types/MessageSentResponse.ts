import { Field, ID, ObjectType } from 'type-graphql'
import { Message } from '@/entity'

@ObjectType()
export class MessageSentResponse {
  @Field(() => ID, { nullable: true })
  userId: string

  @Field(() => ID, { nullable: true })
  groupId: string

  @Field(() => ID, { nullable: true })
  channelId: string

  @Field(() => Message)
  message: Message
}
