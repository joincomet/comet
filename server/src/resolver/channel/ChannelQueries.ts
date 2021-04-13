import { Arg, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { Channel, ServerUser } from '@/entity'
import { Context } from '@/types'
import { getChannelUsers } from '@/resolver/server/queries'

@Resolver(() => Channel)
export class ChannelQueries {
  @Authorized()
  @Query(() => [ServerUser])
  async getChannelUsers(
    @Ctx() ctx: Context,
    @Arg('channelId', () => ID) channelId: string
  ): Promise<ServerUser[]> {
    return getChannelUsers(ctx, channelId)
  }
}
