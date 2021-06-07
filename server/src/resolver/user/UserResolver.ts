import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation, Publisher, PubSub,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Context } from '@/types'
import { Folder, Group, RelationshipStatus, Server, User } from '@/entity'
import {
  changeOnlineStatus,
  ChangeOnlineStatusInput,
  changeUserAvatar,
  ChangeUserAvatarInput,
  createAccount,
  CreateAccountInput,
  deleteAccount,
  DeleteAccountInput,
  globalBan,
  GlobalBanInput,
  login,
  LoginInput,
  LoginResponse,
  changePassword,
  ChangePasswordInput
} from '@/resolver/user/mutations'
import { user, UserArgs } from '@/resolver/user/queries'
import { GraphQLNonNegativeInt } from 'graphql-scalars'
import {ChangePayload, SubscriptionTopic} from "@/resolver/subscriptions";

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

  @FieldResolver(() => [Server])
  async servers(
    @Ctx() { loaders: { userServersLoader } }: Context,
    @Root() user: User
  ): Promise<Server[]> {
    return userServersLoader.load(user.id)
  }

  @FieldResolver(() => [Group])
  async groups(
    @Ctx() { loaders: { userGroupsLoader } }: Context,
    @Root() user: User
  ): Promise<Group[]> {
    return userGroupsLoader.load(user.id)
  }

  @FieldResolver(() => [User])
  async relatedUsers(
    @Ctx() { loaders: { relatedUsersLoader } }: Context,
    @Root() user: User
  ): Promise<User[]> {
    return relatedUsersLoader.load(user.id)
  }

  @FieldResolver(() => RelationshipStatus)
  async relationshipStatus(
    @Ctx() { loaders: { relationshipStatusLoader } }: Context,
    @Root() user: User
  ): Promise<RelationshipStatus> {
    return relationshipStatusLoader.load(user.id)
  }

  @FieldResolver(() => GraphQLNonNegativeInt)
  async unreadCount(
    @Ctx() { loaders: { userUnreadCountLoader } }: Context,
    @Root() user: User
  ): Promise<number> {
    return userUnreadCountLoader.load(user.id)
  }

  @FieldResolver(() => Date, { nullable: true })
  async lastMessageAt(
    @Ctx() { loaders: { userLastMessageAtLoader } }: Context,
    @Root() user: User
  ): Promise<Date> {
    return userLastMessageAtLoader.load(user.id)
  }

  @FieldResolver(() => Boolean)
  async showChat(
    @Ctx() { loaders: { userShowChatLoader } }: Context,
    @Root() user: User
  ): Promise<boolean> {
    return userShowChatLoader.load(user.id)
  }

  @FieldResolver()
  isCurrentUser(@Ctx() { userId }: Context, @Root() user: User): boolean {
    return !!userId && user.id === userId
  }

  // --- Queries --- //

  @Query(() => User, { nullable: true })
  async user(@Ctx() ctx: Context, @Args() args: UserArgs): Promise<User> {
    return user(ctx, args)
  }

  // --- Mutations --- //

  @Mutation(() => LoginResponse)
  async createAccount(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateAccountInput,
    @PubSub(SubscriptionTopic.MessageChanged) notifyMessageChanged: Publisher<ChangePayload>
  ): Promise<LoginResponse> {
    return createAccount(ctx, input, notifyMessageChanged)
  }

  @Authorized()
  @Mutation(() => User)
  async changePassword(
    @Ctx() ctx: Context,
    @Arg('input')
    input: ChangePasswordInput
  ): Promise<User> {
    return changePassword(ctx, input)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteAccount(
    @Ctx() ctx: Context,
    @Arg('input') input: DeleteAccountInput
  ): Promise<boolean> {
    return deleteAccount(ctx, input)
  }

  @Authorized()
  @Mutation(() => User)
  async changeUserAvatar(
    @Ctx() ctx: Context,
    @Arg('input') input: ChangeUserAvatarInput
  ): Promise<User> {
    return changeUserAvatar(ctx, input)
  }

  @Mutation(() => LoginResponse)
  async login(
    @Ctx() ctx: Context,
    @Arg('input') input: LoginInput
  ): Promise<LoginResponse> {
    return login(ctx, input)
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
