import { Field, Int, ObjectType } from 'type-graphql'
import { Message } from '@/entity'

@ObjectType()
export class GetMessagesResponse {
  @Field(() => Int)
  page: number

  @Field(() => Int, { nullable: true })
  nextPage?: number

  @Field(() => [Message])
  messages: Message[]
}
