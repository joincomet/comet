import { Field, ObjectType } from 'type-graphql'
import { User } from '@/entity'

@ObjectType()
export class GetUserRelationshipsResponse {
  @Field(() => [User])
  friends: User[]

  @Field(() => [User])
  outgoingFriendRequests: User[]

  @Field(() => [User])
  incomingFriendRequests: User[]

  @Field(() => [User])
  blockingUsers: User[]

  @Field(() => [User])
  blockedByUsers: User[]
}
