import { Field, ObjectType } from 'type-graphql'
import { Group, User } from '@/entity'

@ObjectType()
export class UserJoinedGroupResponse {
  @Field(() => User)
  user: User

  @Field(() => Group)
  group: Group
}
