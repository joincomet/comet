import { Field, ObjectType } from 'type-graphql'
import { Message } from '@/entity'

@ObjectType()
export class GetMessagesResponse {
  @Field()
  hasMore: boolean

  @Field(() => [Message])
  messages: Message[]
}
