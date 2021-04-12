import { Arg, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { User } from '@/entity'
import {
  getGroupsAndDms,
  GroupDmUnion
} from '@/resolver/user/queries/getGroupsAndDms'
import {
  getUserRelationships,
  GetUserRelationshipsResponse
} from '@/resolver/user/queries/getUserRelationships'
import {
  getCurrentUser,
  getMutualFriends,
  getUser
} from '@/resolver/user/queries'

@Resolver(() => User)
export class UserQueries {
  @Query(() => User, {
    nullable: true,
    description: 'Returns the currently logged in user, or null'
  })
  async getCurrentUser(@Ctx() ctx: Context): Promise<User> {
    return getCurrentUser(ctx)
  }

  @Authorized()
  @Query(() => [GroupDmUnion], {
    description:
      'Get list of groups and DMs, sorted by latest activity (updatedAt)'
  })
  async getGroupsAndDms(
    @Ctx() ctx: Context
  ): Promise<Array<typeof GroupDmUnion>> {
    return getGroupsAndDms(ctx)
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
    @Ctx() ctx: Context,
    @Arg('userId', () => ID) userId: string
  ): Promise<User> {
    return getUser(ctx, userId)
  }

  @Authorized()
  @Query(() => GetUserRelationshipsResponse)
  async getUserRelationships(
    @Ctx() ctx: Context
  ): Promise<GetUserRelationshipsResponse> {
    return getUserRelationships(ctx)
  }

  @Authorized()
  @Query(() => [User])
  async getMutualFriends(
    @Ctx() ctx: Context,
    @Arg('userId', () => ID) userId: string
  ): Promise<User[]> {
    return getMutualFriends(ctx, userId)
  }
}
