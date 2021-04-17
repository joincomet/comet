import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class MoveServerInput {
  @Field(() => ID)
  serverId: string

  @Field(() => ID, { nullable: true })
  beforeServerId?: string
}
