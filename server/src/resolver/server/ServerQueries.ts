import {
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import { Channel, Server, Role, Folder } from '@/entity'
import { Context } from '@/types'
import {
  getPublicServers,
  GetPublicServersArgs
} from '@/resolver/server/queries'
import { getChannels } from '@/resolver/channel/queries/getChannels'
import { myRoles } from '@/resolver/server/fields'
import { getServerFolders } from '@/resolver/folder/queries/getServerFolders'

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
  @FieldResolver(() => [Channel])
  async channels(
    @Ctx() { em, user }: Context,
    @Root() server: Server
  ): Promise<Channel[]> {
    await user.checkJoinedServer(em, server.id)
    return getChannels({ em, user }, server.id)
  }

  @Authorized()
  @FieldResolver(() => [Role])
  async myRoles(@Ctx() ctx: Context, @Root() server: Server): Promise<Role[]> {
    return myRoles(ctx, server)
  }

  @Authorized()
  @FieldResolver(() => [Folder])
  async folders(
    @Ctx() ctx: Context,
    @Root() server: Server
  ): Promise<Folder[]> {
    return getServerFolders(ctx, server.id)
  }
}
