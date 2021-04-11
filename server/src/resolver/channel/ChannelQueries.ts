import { Arg, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Channel } from '@/entity'
import { CheckJoinedChannelServer } from '@/util/auth/middlewares/CheckJoinedChannelServer'
import { Context } from '@/types'
import {
  getChannelPermissions,
  GetChannelPermissionsResponse
} from './queries/getChannelPermissions'

@Resolver(() => Channel)
export class ChannelQueries {
  @CheckJoinedChannelServer()
  @Query(() => GetChannelPermissionsResponse)
  async getChannelPermissions(
    @Ctx() ctx: Context,
    @Arg('channelId', () => ID) channelId: string
  ): Promise<GetChannelPermissionsResponse> {
    return getChannelPermissions(ctx, channelId)
  }
}
