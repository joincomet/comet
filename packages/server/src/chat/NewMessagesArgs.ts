import { ArgsType, Field, ID, Int } from 'type-graphql'
import { Max, Min } from 'class-validator'

@ArgsType()
export class NewMessagesArgs {
  @Field(() => ID)
  channelId: bigint

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  page = 0

  @Field(() => Int, { defaultValue: 100 })
  @Min(1)
  @Max(100)
  pageSize = 100
}
