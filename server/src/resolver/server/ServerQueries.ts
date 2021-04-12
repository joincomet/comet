import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Channel, Server } from '@/entity'
import { Context } from '@/types'
import { ServerPermission } from '@/types/ServerPermission'
import { ChannelPermission } from '@/types/ChannelPermission'
import { CheckChannelPermission } from '@/util'
import { CheckJoinedServer } from '@/util/auth/middlewares/CheckJoinedServer'
import { getServerChannels } from '@/resolver/channel/queries/getServerChannels'
import {
  ChannelUsersResponse,
  getChannelUsers,
  getJoinedServers,
  getMutualServers,
  getPublicServers,
  GetPublicServersArgs,
  getServerPermissions
} from '@/resolver/server/queries'

@Resolver(() => Server)
export class ServerQueries {
  @Authorized()
  @Query(() => [Server])
  async getPublicServers(
    @Ctx() ctx: Context,
    @Args() args: GetPublicServersArgs
  ): Promise<Server[]> {
    return getPublicServers(ctx, args)
  }

  @Authorized()
  @Query(() => [Server])
  async getJoinedServers(@Ctx() ctx: Context): Promise<Server[]> {
    return getJoinedServers(ctx)
  }

  @CheckChannelPermission(ChannelPermission.ViewChannel)
  @Query(() => [ChannelUsersResponse])
  async getChannelUsers(
    @Ctx() ctx: Context,
    @Arg('channelId', () => ID) channelId: string
  ): Promise<ChannelUsersResponse[]> {
    return getChannelUsers(ctx, channelId)
  }

  @CheckJoinedServer()
  @Query(() => [ServerPermission])
  async getServerPermissions(
    @Ctx() ctx: Context,
    @Arg('serverId', () => ID) serverId: string
  ): Promise<ServerPermission[]> {
    return getServerPermissions(ctx, serverId)
  }

  @Authorized()
  @Query(() => [Server])
  async getMutualServers(
    @Ctx() ctx: Context,
    @Arg('userId', () => ID) userId: string
  ) {
    return getMutualServers(ctx, userId)
  }

  @CheckJoinedServer()
  @FieldResolver(() => [Channel])
  async channels(
    @Ctx() ctx: Context,
    @Root() server: Server
  ): Promise<Channel[]> {
    return getServerChannels(ctx, server.id)
  }
}
