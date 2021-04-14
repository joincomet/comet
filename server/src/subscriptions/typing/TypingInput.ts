import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class TypingInput {
  @Field(() => ID, { nullable: true })
  channelId?: string

  @Field(() => ID, { nullable: true })
  groupId?: string

  @Field(() => ID, { nullable: true })
  userId?: string
}
