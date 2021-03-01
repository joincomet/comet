import { Field, Int, ObjectType } from 'type-graphql'
import { Message } from '@/chat/Message.entity'

@ObjectType()
export class MessagesResponse {
  @Field(() => Int)
  page: number

  @Field(() => Int, { nullable: true })
  nextPage?: number

  @Field(() => [Message])
  messages: Message[]
}
