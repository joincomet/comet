import { ArgsType, Field, ID, Int } from 'type-graphql'
import { Max, Min } from 'class-validator'

@ArgsType()
export class GetMessagesArgs {
  @Field(() => ID, { nullable: true })
  channelId?: string

  @Field(() => ID, { nullable: true })
  groupId?: string

  @Field(() => ID, { nullable: true })
  userId?: string

  @Field({ defaultValue: false })
  pinned: boolean

  @Field({ nullable: true })
  initialTime: Date

  @Field(() => Int, { defaultValue: 50 })
  @Min(1)
  @Max(100)
  pageSize = 50

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  page = 0
}
