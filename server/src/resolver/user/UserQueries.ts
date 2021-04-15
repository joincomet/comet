import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '@/types'
import { Folder, ServerUser, User } from '@/entity'
import {
  getCurrentUser,
  getMutualFriends,
  getUser
} from '@/resolver/user/queries'
import { getOtherUserFolders } from '@/resolver/folder/queries/getOtherUserFolders'
import { getMutualServers } from '@/resolver/server/queries'

@Resolver(() => User)
export class UserQueries {
  @Query(() => User, {
    nullable: true
  })
  async getCurrentUser(@Ctx() ctx: Context): Promise<User> {
    return getCurrentUser(ctx)
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

  @Authorized('USER')
  @FieldResolver(() => [Folder])
  async folders(
    @Ctx() { loaders: { userFoldersLoader } }: Context,
    @Root() user: User
  ): Promise<Folder[]> {
    return userFoldersLoader.load(user.id)
  }

  @Authorized()
  @Query(() => [Folder])
  async getOtherUserFolders(
    @Ctx() ctx: Context,
    @Arg('userId', () => ID) userId: string
  ): Promise<Folder[]> {
    return getOtherUserFolders(ctx, userId)
  }

  @Authorized()
  @Query(() => [User])
  async getMutualFriends(
    @Ctx() ctx: Context,
    @Arg('userId', () => ID) userId: string
  ): Promise<User[]> {
    return getMutualFriends(ctx, userId)
  }

  @Authorized()
  @Query(() => [ServerUser])
  async getMutualServers(
    @Ctx() ctx: Context,
    @Arg('userId', () => ID) userId: string
  ): Promise<ServerUser[]> {
    return getMutualServers(ctx, userId)
  }
}
