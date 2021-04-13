import { Field, ID, ObjectType } from 'type-graphql'
import { User } from '@/entity'

@ObjectType()
export class UserJoinedGroupResponse {
  @Field(() => User)
  user: User

  @Field(() => ID)
  groupId: string
}
