import { Arg, Args, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { CreateRoleInput, createRole } from '@/resolver/role/mutations'
import { Role } from '@/entity'
import { Context } from '@/types'
import {
  UpdateRoleInput,
  updateRole
} from '@/resolver/role/mutations/updateRole'

@Resolver()
export class RoleMutations {
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
}
