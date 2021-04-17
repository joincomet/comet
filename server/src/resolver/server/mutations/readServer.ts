import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class ReadServerInput {
  @Field(() => ID)
  serverId: string
}
