import { Field, ObjectType } from 'type-graphql'
import { User } from '@/entity'

@ObjectType()
export class GetFriendRequestsResponse {
  @Field(() => User)
  user: User

  @Field()
  isOutgoing: boolean
}
