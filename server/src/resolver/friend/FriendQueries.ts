import { FriendData, User } from '@/entity'
import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { FriendStatus, GetFriendRequestsResponse } from '@/resolver/friend'
import { QueryOrder } from '@mikro-orm/core'

@Resolver(() => FriendData)
export class FriendQueries {
  @Authorized()
  @Query(() => [GetFriendRequestsResponse], {
    description: 'Returns list of friend requests'
  })
  async getFriendRequests(
    @Ctx() { em, user }: Context
  ): Promise<GetFriendRequestsResponse[]> {
    const data = await em.find(
      FriendData,
      {
        $and: [
          { user },
          {
            $or: [
              { status: FriendStatus.FriendRequestIncoming },
              { status: FriendStatus.FriendRequestOutgoing }
            ]
          }
        ]
      },
      ['toUser'],
      { updatedAt: QueryOrder.DESC }
    )
    return data.map(
      friend =>
        ({
          user: friend.toUser,
          isOutgoing: friend.status === FriendStatus.FriendRequestOutgoing
        } as GetFriendRequestsResponse)
    )
  }

  @Authorized()
  @Query(() => [User], { description: 'Returns list of friends' })
  async getFriends(@Ctx() { em, user }: Context): Promise<User[]> {
    const data = await em.find(
      FriendData,
      {
        $and: [{ user }, { status: FriendStatus.Friends }]
      },
      ['toUser']
    )
    return data
      .map(friend => friend.toUser)
      .sort((a, b) => b.name.localeCompare(a.name))
  }

  @Authorized()
  @Query(() => [User])
  async getBlockedUsers(@Ctx() { em, user }: Context): Promise<User[]> {
    const data = await em.find(
      FriendData,
      {
        $and: [
          { user },
          {
            $or: [
              { status: FriendStatus.Blocking },
              { status: FriendStatus.Blocked }
            ]
          }
        ]
      },
      ['toUser'],
      { updatedAt: QueryOrder.DESC }
    )
    return data.map(friend => friend.toUser)
  }
}
