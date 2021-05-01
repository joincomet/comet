import { Field, ID, InputType, ArgsType } from 'type-graphql'

@InputType()
export class TypingInput {
  @Field(() => ID, { nullable: true })
  channelId?: string

  @Field(() => ID, { nullable: true })
  groupId?: string

  @Field(() => ID, { nullable: true })
  userId?: string

  @Field(() => Boolean, { defaultValue: true })
  isTyping: boolean
}

@ArgsType()
export class TypingArgs {
  @Field(() => ID, { nullable: true })
  channelId?: string

  @Field(() => ID, { nullable: true })
  groupId?: string

  @Field(() => ID, { nullable: true })
  userId?: string
}
