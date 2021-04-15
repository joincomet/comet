import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { User } from '@/entity'
import { LoginResponse } from '@/resolver/user'
import {
  changePassword,
  ChangePasswordInput
} from '@/resolver/user/mutations/changePassword'
import {
  createAccount,
  CreateAccountInput,
  login,
  LoginInput
} from '@/resolver/user/mutations'
import {
  updateUser,
  UpdateUserInput
} from '@/resolver/user/mutations/updateUser'

@Resolver()
export class UserMutations {
  @Mutation(() => LoginResponse)
  async createAccount(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateAccountInput
  ): Promise<LoginResponse> {
    return createAccount(ctx, input)
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
  async updateUser(
    @Ctx() ctx: Context,
    @Arg('input')
    input: UpdateUserInput
  ): Promise<User> {
    return updateUser(ctx, input)
  }
}
