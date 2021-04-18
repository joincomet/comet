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
import { Folder, ServerUser, User } from '@/entity'
import {
  changeOnlineStatus,
  ChangeOnlineStatusInput,
  changePassword,
  ChangePasswordInput,
  createAccount,
  CreateAccountInput,
  deleteAccount,
  globalBan,
  GlobalBanInput,
  login,
  LoginInput,
  LoginResponse,
  updateAccount,
  UpdateAccountInput
} from '@/resolver/user/mutations'
import { channelUsers, roleUsers, user } from '@/resolver/user/queries'

@Resolver(() => User)
export class UserResolver {
  // --- Fields --- //
  @FieldResolver(() => [Folder])
  async folders(
    @Ctx() { loaders: { userFoldersLoader } }: Context,
    @Root() user: User
  ): Promise<Folder[]> {
    return userFoldersLoader.load(user.id)
  }

  @FieldResolver(() => [ServerUser])
  async servers(
    @Ctx() { loaders: { serversLoader } }: Context,
    @Root() user: User
  ): Promise<ServerUser[]> {
    return serversLoader.load(user.id)
  }

  @FieldResolver()
  isCurrentUser(
    @Ctx() { user: currentUser }: Context,
    @Root() user: User
  ): boolean {
    return currentUser && user.id === currentUser.id
  }

  // --- Queries --- //

  @Query(() => User, { nullable: true })
  async user(
    @Ctx() ctx: Context,
    @Arg('id', () => ID, { nullable: true }) id?: string
  ): Promise<User> {
    return user(ctx, id)
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
  @Mutation(() => Boolean)
  async globalBan(
    @Ctx() ctx: Context,
    @Arg('input') input: GlobalBanInput
  ): Promise<boolean> {
    return globalBan(ctx, input)
  }
}
