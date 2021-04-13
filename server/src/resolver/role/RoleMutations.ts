import {
  Args,
  Authorized,
  Ctx,
  Mutation,
  Publisher,
  Resolver
} from 'type-graphql'
import { ReorderRoleArgs, reorderRoles } from '@/resolver/role/mutations'
import { Server } from '@/entity'
import { Context } from '@/types'

@Resolver()
export class RoleMutations {
  @Authorized()
  @Mutation(() => Server)
  async reorderRoles(
    @Ctx() ctx: Context,
    @Args() args: ReorderRoleArgs,
    notifyServerUpdated: Publisher<{ serverId: string }>
  ): Promise<Server> {
    return reorderRoles(ctx, args, notifyServerUpdated)
  }
}
