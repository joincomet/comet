import { ArgsType, Field, ID } from 'type-graphql'

@ArgsType()
export class SendMessageArgs {
  @Field()
  text: string

  @Field(() => ID, { nullable: true })
  channelId?: string

  @Field(() => ID, { nullable: true })
  groupId?: string

  @Field(() => ID, { nullable: true })
  userId?: string
}
