import { ArgsType, Field, ID } from 'type-graphql'

@ArgsType()
export class UserServerArgs {
  @Field(() => ID)
  serverId: string

  @Field(() => ID)
  userId: string
}
