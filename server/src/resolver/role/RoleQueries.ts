import { Role, ServerUser } from '@/entity'
import { Arg, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { getRoleUsers } from '@/resolver/role/queries/getRoleUsers'

@Resolver(() => Role)
export class RoleQueries {
  @Authorized()
  @Query(() => [ServerUser])
  async getRoleUsers(
    @Ctx() ctx: Context,
    @Arg('roleId', () => ID) roleId: string
  ): Promise<ServerUser[]> {
    return getRoleUsers(ctx, roleId)
  }
}
