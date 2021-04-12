import { Field, ObjectType } from 'type-graphql'
import { User } from '@/entity'
import { FriendStatus } from '@/resolver/user'

@ObjectType()
export class FriendStatusChangedResponse {
  @Field(() => User)
  user: User

  @Field(() => FriendStatus)
  status: FriendStatus
}
