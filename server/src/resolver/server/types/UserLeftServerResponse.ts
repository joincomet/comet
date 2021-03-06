import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class UserLeftServerResponse {
  @Field(() => ID)
  userId: string

  @Field(() => ID)
  serverId: string
}
