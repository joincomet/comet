import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class BanUserFromServerInput {
  @Field(() => ID)
  serverId: string

  @Field(() => ID)
  userId: string
}
