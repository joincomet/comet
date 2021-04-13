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
import { Folder, Server, User } from '@/entity'
import { getCurrentUser, getUser } from '@/resolver/user/queries'
import { folders, servers } from './fields'

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

  @Authorized()
  @FieldResolver(() => [Server])
  async servers(@Ctx() ctx: Context, @Root() user: User): Promise<Server[]> {
    return servers(ctx, user)
  }

  @Authorized()
  @FieldResolver(() => [Folder])
  async folders(@Ctx() ctx: Context, @Root() user: User): Promise<Folder[]> {
    return folders(ctx, user)
  }
}
