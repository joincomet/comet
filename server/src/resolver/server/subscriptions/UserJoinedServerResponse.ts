import { Field, ID, ObjectType } from 'type-graphql'
import { User } from '@/entity'

@ObjectType()
export class UserJoinedServerResponse {
  @Field(() => User)
  user: User

  @Field(() => ID)
  serverId: string
}
