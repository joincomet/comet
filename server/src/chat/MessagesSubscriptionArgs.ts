import { ArgsType, Field, ID, Int } from 'type-graphql'
import { Max, Min } from 'class-validator'

@ArgsType()
export class MessagesSubscriptionArgs {
  @Field(() => ID)
  channelId: string
}
