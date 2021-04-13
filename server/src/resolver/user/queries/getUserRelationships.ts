import { Field, ObjectType } from 'type-graphql'
import { Relationship, RelationshipStatus, User } from '@/entity'
import { Context } from '@/types'
import { QueryOrder } from '@mikro-orm/core'

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

export async function getUserRelationships({
  em,
  user
}: Context): Promise<GetUserRelationshipsResponse> {
  const friends = (
    await em.find(
      Relationship,
      {
        user,
        status: RelationshipStatus.Friends
      },
      ['friend']
    )
  )
    .map(fd => fd.user)
    .sort((a, b) => b.name.localeCompare(a.name))

  const outgoingFriendRequests = (
    await em.find(
      Relationship,
      {
        user,
        status: RelationshipStatus.FriendRequestOutgoing
      },
      ['friend'],
      { updatedAt: QueryOrder.DESC }
    )
  ).map(fd => fd.user)

  const incomingFriendRequests = (
    await em.find(
      Relationship,
      {
        user,
        status: RelationshipStatus.FriendRequestOutgoing
      },
      ['friend'],
      { updatedAt: QueryOrder.DESC }
    )
  ).map(fd => fd.user)

  const blockingUsers = (
    await em.find(
      Relationship,
      {
        user,
        status: RelationshipStatus.Blocking
      },
      ['friend'],
      { updatedAt: QueryOrder.DESC }
    )
  ).map(fd => fd.user)

  const blockedByUsers = (
    await em.find(
      Relationship,
      {
        user,
        status: RelationshipStatus.Blocked
      },
      ['friend'],
      { updatedAt: QueryOrder.DESC }
    )
  ).map(fd => fd.user)

  return {
    friends,
    outgoingFriendRequests,
    incomingFriendRequests,
    blockingUsers,
    blockedByUsers
  } as GetUserRelationshipsResponse
}
