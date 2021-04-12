import { Field, ObjectType } from 'type-graphql'
import { FriendData, User } from '@/entity'
import { Context } from '@/types'
import { FriendStatus } from '@/resolver/user'
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
      FriendData,
      {
        user,
        status: FriendStatus.Friends
      },
      ['friend']
    )
  )
    .map(fd => fd.friend)
    .sort((a, b) => b.name.localeCompare(a.name))

  const outgoingFriendRequests = (
    await em.find(
      FriendData,
      {
        user,
        status: FriendStatus.FriendRequestOutgoing
      },
      ['friend'],
      { updatedAt: QueryOrder.DESC }
    )
  ).map(fd => fd.user)

  const incomingFriendRequests = (
    await em.find(
      FriendData,
      {
        user,
        status: FriendStatus.FriendRequestOutgoing
      },
      ['friend'],
      { updatedAt: QueryOrder.DESC }
    )
  ).map(fd => fd.user)

  const blockingUsers = (
    await em.find(
      FriendData,
      {
        user,
        status: FriendStatus.Blocking
      },
      ['friend'],
      { updatedAt: QueryOrder.DESC }
    )
  ).map(fd => fd.friend)

  const blockedByUsers = (
    await em.find(
      FriendData,
      {
        user,
        status: FriendStatus.Blocked
      },
      ['friend'],
      { updatedAt: QueryOrder.DESC }
    )
  ).map(fd => fd.friend)

  return {
    friends,
    outgoingFriendRequests,
    incomingFriendRequests,
    blockingUsers,
    blockedByUsers
  } as GetUserRelationshipsResponse
}
