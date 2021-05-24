import { Arg, Authorized, Ctx, ID, Mutation, Resolver } from 'type-graphql'
import { Role, ServerUser } from '@/entity'
import { Context } from '@/types'
import {
  createRole,
  CreateRoleInput,
  updateRole,
  UpdateRoleInput,
  deleteRole,
  DeleteRoleInput,
  setUserRole,
  SetUserRoleInput
} from './mutations'

@Resolver()
export class RoleResolver {
  @Authorized()
  @Mutation(() => Role)
  async createRole(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateRoleInput
  ): Promise<Role> {
    return createRole(ctx, input)
  }

  @Authorized()
  @Mutation(() => Role)
  async updateRole(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateRoleInput
  ): Promise<Role> {
    return updateRole(ctx, input)
  }

  @Authorized()
  @Mutation(() => ID)
  async deleteRole(
    @Ctx() ctx: Context,
    @Arg('input') input: DeleteRoleInput
  ): Promise<string> {
    return deleteRole(ctx, input)
  }

  @Authorized()
  @Mutation(() => ServerUser)
  async setUserRole(
    @Ctx() ctx: Context,
    @Arg('input') input: SetUserRoleInput
  ): Promise<ServerUser> {
    return setUserRole(ctx, input)
  }
}
