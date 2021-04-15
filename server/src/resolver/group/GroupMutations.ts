import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { Group } from '@/entity'
import {
  createGroup,
  CreateGroupInput
} from '@/resolver/group/mutations/createGroup'
import {
  updateGroup,
  UpdateGroupInput
} from '@/resolver/group/mutations/updateGroup'

@Resolver()
export class GroupMutations {
  @Authorized()
  @Mutation(() => Group)
  async createGroup(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateGroupInput
  ): Promise<Group> {
    return createGroup(ctx, input)
  }

  @Authorized()
  @Mutation(() => Group)
  async updateGroup(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateGroupInput
  ): Promise<Group> {
    return updateGroup(ctx, input)
  }
}
