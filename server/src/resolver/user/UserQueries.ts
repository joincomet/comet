import { Arg, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { FriendData, Group, ServerUserJoin, User } from '@/entity'
import { GroupDmUnion } from '@/resolver/user/types/GroupDmUnion'
import { QueryOrder } from '@mikro-orm/core'
import { CustomError } from '@/types/CustomError'
import { FriendStatus, GetUserRelationshipsResponse } from '@/resolver/user'
import { GroupUser } from '@/entity/GroupUser'

@Resolver(() => User)
export class UserQueries {
  @Query(() => User, {
    nullable: true,
    description: 'Returns the currently logged in user, or null'
  })
  async getCurrentUser(@Ctx() { user, em }: Context): Promise<User> {
    if (!user) {
      return null
    }

    if (user.isBanned)
      throw new CustomError(
        'error.login.banned',
        user.banReason ? `: ${user.banReason}` : ''
      )

    user.lastLoginAt = new Date()
    await em.persistAndFlush(user)
    return user
  }

  @Authorized()
  @Query(() => [GroupDmUnion], {
    description:
      'Get list of groups and DMs, sorted by latest activity (updatedAt)'
  })
  async getGroupsAndDms(
    @Ctx() { user, em }: Context
  ): Promise<Array<typeof GroupDmUnion>> {
    const dms = await em.find(
      FriendData,
      { user, showChat: true },
      ['toUser'],
      { lastMessageAt: QueryOrder.DESC }
    )
    dms.forEach(dm => (dm.toUser.unreadCount = dm.unreadCount))

    const groupUsers = await em.find(GroupUser, { user }, ['group'])
    groupUsers.forEach(gu => (gu.group.unreadCount = gu.unreadCount))
    const groups = groupUsers.map(gu => gu.group)

    const arr: (Group | FriendData)[] = [].concat(groups).concat(dms)
    return arr
      .sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime())
      .map(i => {
        if (i instanceof Group) return i
        else if (i instanceof FriendData) return i.toUser
      })
  }

  /*@FieldResolver(() => Boolean)
  isCurrentUser(
    @Root() user: User,
    @Ctx() { user: currentUser }: Context
  ): boolean {
    return currentUser && user.id === currentUser.id
  }*/

  @Authorized()
  @Query(() => User)
  async getUser(
    @Ctx() { em }: Context,
    @Arg('userId', () => ID) userId: string
  ): Promise<User> {
    return em.findOneOrFail(User, userId)
  }

  @Authorized()
  @Query(() => GetUserRelationshipsResponse)
  async getUserRelationships(
    @Ctx() { em, user }: Context
  ): Promise<GetUserRelationshipsResponse> {
    const friends = (
      await em.find(
        FriendData,
        {
          user,
          status: FriendStatus.Friends
        },
        ['toUser']
      )
    )
      .map(friend => friend.toUser)
      .sort((a, b) => b.name.localeCompare(a.name))

    const outgoingFriendRequests = (
      await em.find(
        FriendData,
        {
          user,
          status: FriendStatus.FriendRequestOutgoing
        },
        ['toUser'],
        { updatedAt: QueryOrder.DESC }
      )
    ).map(friend => friend.user)

    const incomingFriendRequests = (
      await em.find(
        FriendData,
        {
          user,
          status: FriendStatus.FriendRequestOutgoing
        },
        ['toUser'],
        { updatedAt: QueryOrder.DESC }
      )
    ).map(friend => friend.user)

    const blockingUsers = (
      await em.find(
        FriendData,
        {
          user,
          status: FriendStatus.Blocking
        },
        ['toUser'],
        { updatedAt: QueryOrder.DESC }
      )
    ).map(friend => friend.toUser)

    const blockedByUsers = (
      await em.find(
        FriendData,
        {
          user,
          status: FriendStatus.Blocked
        },
        ['toUser'],
        { updatedAt: QueryOrder.DESC }
      )
    ).map(friend => friend.toUser)

    return {
      friends,
      outgoingFriendRequests,
      incomingFriendRequests,
      blockingUsers,
      blockedByUsers
    } as GetUserRelationshipsResponse
  }

  @Authorized()
  @Query(() => [User])
  async getMutualFriends(
    @Ctx() { user, em }: Context,
    @Arg('userId', () => ID) userId: string
  ) {
    const them = await em.findOneOrFail(User, userId)
    const myFriends = (
      await em.find(FriendData, { user, status: FriendStatus.Friends }, [
        'toUser'
      ])
    ).map(f => f.toUser)
    const theirFriends = (
      await em.find(FriendData, { user: them, status: FriendStatus.Friends }, [
        'toUser'
      ])
    )
      .map(f => f.toUser)
      .map(f => f.id)
    return myFriends.filter(f => theirFriends.includes(f.id))
  }
}
