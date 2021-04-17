import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class LeaveServerInput {
  @Field(() => ID)
  serverId: string
}
