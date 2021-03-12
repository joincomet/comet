import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class UserLeftGroupResponse {
  @Field(() => ID)
  userId: string

  @Field(() => ID)
  groupId: string
}
