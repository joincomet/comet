import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '@/types'
import { ServerUser, User } from '@/entity'
import {
  ChangePasswordInput,
  CreateAccountInput,
  LoginInput,
  UpdateAccountInput,
  LoginResponse,
  createAccount,
  updateAccount,
  changePassword,
  login
} from '@/resolver/user/mutations'
import { channelUsers, roleUsers, user } from '@/resolver/user/queries'
import { ChangeOnlineStatusInput } from '@/resolver/user/mutations/changeOnlineStatus'
import { GlobalBanInput } from '@/resolver/user/mutations/globalBan'

@Resolver(() => User)
export class UserResolver {
  // --- Fields --- //

  @FieldResolver()
  isCurrentUser(
    @Ctx() { user: currentUser }: Context,
    @Root() user: User
  ): boolean {
    return currentUser && user.id === currentUser.id
  }

  // --- Queries --- //

  @Authorized()
  @Query(() => User)
  async user(
    @Ctx() ctx: Context,
    @Arg('userId', () => ID, { nullable: true }) userId?: string
  ): Promise<User> {
    return user(ctx, userId)
  }

  @Authorized()
  @Query(() => [ServerUser])
  async channelUsers(
    @Ctx() ctx: Context,
    @Arg('channelId', () => ID) channelId: string
  ): Promise<ServerUser[]> {
    return channelUsers(ctx, channelId)
  }

  @Authorized()
  @Query(() => [ServerUser])
  async roleUsers(
    @Ctx() ctx: Context,
    @Arg('roleId', () => ID) roleId: string
  ): Promise<ServerUser[]> {
    return roleUsers(ctx, roleId)
  }

  // --- Mutations --- //

  @Mutation(() => LoginResponse)
  async createAccount(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateAccountInput
  ): Promise<LoginResponse> {
    return createAccount(ctx, input)
  }

  @Authorized()
  @Mutation(() => User)
  async updateAccount(
    @Ctx() ctx: Context,
    @Arg('input')
    input: UpdateAccountInput
  ): Promise<User> {
    return updateAccount(ctx, input)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteAccount(@Ctx() ctx: Context): Promise<boolean> {
    return deleteAccount(ctx)
  }

  @Mutation(() => LoginResponse)
  async login(
    @Ctx() ctx: Context,
    @Arg('input') input: LoginInput
  ): Promise<LoginResponse> {
    return login(ctx, input)
  }

  @Authorized()
  @Mutation(() => LoginResponse)
  async changePassword(
    @Ctx() ctx: Context,
    @Arg('input') input: ChangePasswordInput
  ): Promise<LoginResponse> {
    return changePassword(ctx, input)
  }

  @Authorized()
  @Mutation(() => User)
  async changeOnlineStatus(
    @Ctx() ctx: Context,
    @Arg('input') input: ChangeOnlineStatusInput
  ): Promise<User> {
    return changeOnlineStatus(ctx, input)
  }

  @Authorized()
  @Mutation(() => User)
  async globalBan(
    @Ctx() ctx: Context,
    @Arg('input') input: GlobalBanInput
  ): Promise<User> {
    return globalBan(ctx, input)
  }
}
