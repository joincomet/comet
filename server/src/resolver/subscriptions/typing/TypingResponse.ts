import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class TypingResponse {
  @Field(() => ID)
  typingUserId: string

  @Field(() => Boolean)
  isTyping: boolean
}
