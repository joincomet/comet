import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { User } from '@/entity'
import { LoginResponse } from '@/resolver/user'
import {
  changePassword,
  ChangePasswordArgs
} from '@/resolver/user/mutations/changePassword'
import {
  editAccount,
  EditAccountArgs
} from '@/resolver/user/mutations/editAccount'
import {
  banUserGlobal,
  BanUserGlobalArgs,
  LoginArgs,
  login,
  unbanUserGlobal,
  CreateAccountArgs,
  createAccount,
  ChangeFriendStatusArgs,
  changeFriendStatus
} from '@/resolver/user/mutations'
import { FriendStatusChangedPayload } from '@/resolver/user/subscriptions'

@Resolver()
export class UserMutations {
  @Mutation(() => LoginResponse)
  async createAccount(
    @Ctx() ctx: Context,
    @Args() args: CreateAccountArgs
  ): Promise<LoginResponse> {
    return createAccount(ctx, args)
  }

  @Mutation(() => LoginResponse)
  async login(
    @Ctx() ctx: Context,
    @Args() args: LoginArgs
  ): Promise<LoginResponse> {
    return login(ctx, args)
  }

  @Authorized()
  @Mutation(() => LoginResponse)
  async changePassword(
    @Ctx() ctx: Context,
    @Args() args: ChangePasswordArgs
  ): Promise<LoginResponse> {
    return changePassword(ctx, args)
  }

  @Authorized()
  @Mutation(() => User)
  async editAccount(
    @Ctx() ctx: Context,
    @Args()
    args: EditAccountArgs,
    @PubSub(SubscriptionTopic.UserUpdated)
    notifyUserUpdated: Publisher<{ userId: string }>
  ): Promise<User> {
    return editAccount(ctx, args, notifyUserUpdated)
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async banUserGlobal(
    @Ctx() ctx: Context,
    @Args() args: BanUserGlobalArgs,
    @PubSub(SubscriptionTopic.UserBannedGlobal)
    notifyUserBannedGlobal: Publisher<{ userId: string }>
  ): Promise<boolean> {
    return banUserGlobal(ctx, args, notifyUserBannedGlobal)
  }

  @Authorized('ADMIN')
  @Mutation(() => Boolean)
  async unbanUserGlobal(
    @Ctx() ctx: Context,
    @Arg('userId', () => ID)
    userId: string
  ): Promise<boolean> {
    return unbanUserGlobal(ctx, userId)
  }

  @Authorized()
  @Mutation(() => User)
  async changeFriendStatus(
    @Ctx() ctx: Context,
    @Args() args: ChangeFriendStatusArgs,
    @PubSub(SubscriptionTopic.RelationshipUpdated)
    notifyFriendStatusChanged: Publisher<FriendStatusChangedPayload>
  ): Promise<User> {
    return changeFriendStatus(ctx, args, notifyFriendStatusChanged)
  }
}
