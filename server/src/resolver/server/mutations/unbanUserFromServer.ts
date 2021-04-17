import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class UnbanUserFromServerInput {
  @Field(() => ID)
  serverId: string

  @Field(() => ID)
  userId: string
}
