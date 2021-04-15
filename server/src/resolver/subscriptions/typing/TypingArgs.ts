import { Field, ID, ArgsType } from 'type-graphql'

@ArgsType()
export class TypingArgs {
  @Field(() => ID, { nullable: true })
  channelId?: string

  @Field(() => ID, { nullable: true })
  groupId?: string

  @Field(() => ID, { nullable: true })
  userId?: string
}
