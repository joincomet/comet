import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Message } from '@/entity'

@ObjectType()
export class MessageRemovedResponse {
  @Field(() => ID, { nullable: true })
  userId: string

  @Field(() => ID, { nullable: true })
  groupId: string

  @Field(() => ID, { nullable: true })
  channelId: string

  @Field(() => ID)
  messageId: string
}
