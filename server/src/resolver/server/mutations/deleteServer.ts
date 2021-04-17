import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class DeleteServerInput {
  @Field(() => ID)
  serverId: string
}
