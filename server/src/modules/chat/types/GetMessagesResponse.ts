import { Field, Int, ObjectType } from 'type-graphql'
import { ChatMessage } from '@/entity/ChatMessage'

@ObjectType()
export class GetMessagesResponse {
  @Field(() => Int)
  page: number

  @Field(() => Int, { nullable: true })
  nextPage?: number

  @Field(() => [ChatMessage])
  messages: ChatMessage[]
}
