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
import { Channel, Server, Role, Folder, ServerUser } from '@/entity'
import { Context } from '@/types'
import {
  getJoinedServers,
  getMutualServers,
  getPublicServers,
  GetPublicServersArgs
} from '@/resolver/server/queries'
import { myRoles } from '@/resolver/server/fields'

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
  async getJoinedServers(
    @Ctx() ctx: Context,
    @Arg('id', () => ID) id: string
  ): Promise<Server[]> {
    return getJoinedServers(ctx)
  }

  @Authorized()
  @Query(() => [ServerUser])
  async getMutualServers(
    @Ctx() ctx: Context,
    @Arg('userId', () => ID) userId: string
  ): Promise<ServerUser[]> {
    return getMutualServers(ctx, userId)
  }

  @Authorized()
  @FieldResolver(() => [Channel])
  async channels(
    @Ctx() { loaders: { channelLoader } }: Context,
    @Root() server: Server
  ): Promise<Channel[]> {
    return channelLoader.load(server.id)
  }

  @Authorized()
  @FieldResolver(() => [Role])
  async myRoles(@Ctx() ctx: Context, @Root() server: Server): Promise<Role[]> {
    return myRoles(ctx, server)
  }

  @Authorized()
  @FieldResolver(() => [Folder])
  async folders(
    @Ctx() { loaders: { serverFolderLoader } }: Context,
    @Root() server: Server
  ): Promise<Folder[]> {
    return serverFolderLoader.load(server.id)
  }
}
