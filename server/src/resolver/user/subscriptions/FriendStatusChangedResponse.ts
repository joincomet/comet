import { Field, ObjectType } from 'type-graphql'
import { RelationshipStatus, User } from '@/entity'

@ObjectType()
export class FriendStatusChangedResponse {
  @Field(() => User)
  user: User

  @Field(() => RelationshipStatus)
  status: RelationshipStatus
}
