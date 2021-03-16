import { FriendRelationship, FriendRequest, User } from '@/entity'
import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '@/types'
import {
  FriendRequestStatus,
  GetFriendRequestsResponse
} from '@/resolver/friend'

@Resolver(() => FriendRequest)
export class FriendQueries {
  @Authorized()
  @Query(() => [GetFriendRequestsResponse], {
    description: 'Returns list of friend requests'
  })
  async getFriendRequests(@Ctx() { em, user }: Context) {
    const frs = await em.find(FriendRequest, {
      status: FriendRequestStatus.Pending,
      $or: [{ fromUser: user }, { toUser: user }]
    })
    return frs.map(
      fr =>
        ({
          user: fr.fromUser === user ? fr.toUser : fr.fromUser,
          isOutgoing: fr.fromUser === user
        } as GetFriendRequestsResponse)
    )
  }

  @Authorized()
  @Query(() => [User], { description: 'Returns list of friends' })
  async getFriends(@Ctx() { em, user }: Context) {
    const relations = await em.find(
      FriendRelationship,
      {
        $or: [{ user1: user }, { user2: user }]
      },
      ['user1', 'user2']
    )
    return relations
      .map(friendRel =>
        friendRel.user1 === user ? friendRel.user2 : friendRel.user1
      )
      .sort((a, b) => a.name.localeCompare(b.name))
  }
}
