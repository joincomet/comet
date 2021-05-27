import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root
} from 'type-graphql'
import {
  Channel,
  Folder,
  Role,
  Server,
  ServerPermission,
  ServerUser
} from '@/entity'
import { Context } from '@/types'
import {
  publicServers,
  PublicServersArgs,
  serverUsers,
  server,
  ServerArgs
} from './queries'
import {
  banUserFromServer,
  BanUserFromServerInput,
  createServer,
  CreateServerInput,
  deleteServer,
  DeleteServerInput,
  featureServer,
  FeatureServerInput,
  joinServer,
  JoinServerInput,
  kickUserFromServer,
  KickUserFromServerInput,
  leaveServer,
  LeaveServerInput,
  moveServer,
  MoveServerInput,
  readServer,
  ReadServerInput,
  unbanUserFromServer,
  UnbanUserFromServerInput,
  unfeatureServer,
  UnfeatureServerInput,
  updateServer,
  UpdateServerInput
} from './mutations'
import { GraphQLNonNegativeInt, GraphQLVoid } from 'graphql-scalars'
import { ChangePayload, SubscriptionTopic } from '@/resolver/subscriptions'
import { PubSub } from 'type-graphql/dist/decorators/PubSub'
import { Publisher } from 'type-graphql/dist/interfaces/Publisher'

@Resolver(() => Server)
export class ServerResolver {
  @FieldResolver(() => [Channel])
  async channels(
    @Ctx() { loaders: { serverChannelsLoader } }: Context,
    @Root() server: Server
  ): Promise<Channel[]> {
    return serverChannelsLoader.load(server.id)
  }

  @FieldResolver(() => [Folder])
  async folders(
    @Ctx() { loaders: { serverFoldersLoader } }: Context,
    @Root() server: Server
  ): Promise<Folder[]> {
    return serverFoldersLoader.load(server.id)
  }

  @FieldResolver(() => [Role])
  async roles(
    @Ctx() { loaders: { serverRolesLoader } }: Context,
    @Root() server: Server
  ): Promise<Role[]> {
    return serverRolesLoader.load(server.id)
  }

  @FieldResolver(() => [ServerPermission])
  async permissions(
    @Ctx() { loaders: { serverPermissionsLoader } }: Context,
    @Root() server: Server
  ): Promise<ServerPermission[]> {
    return serverPermissionsLoader.load(server.id)
  }

  @FieldResolver(() => GraphQLNonNegativeInt)
  async onlineCount(
    @Ctx() { loaders: { serverOnlineCountLoader } }: Context,
    @Root() server: Server
  ): Promise<number> {
    return serverOnlineCountLoader.load(server.id)
  }

  @FieldResolver(() => Boolean)
  async isJoined(
    @Ctx() { loaders: { serverJoinedLoader } }: Context,
    @Root() server: Server
  ): Promise<boolean> {
    return serverJoinedLoader.load(server.id)
  }

  // --- Queries ---
  @Query(() => [Server])
  async publicServers(
    @Ctx() ctx: Context,
    @Args() args: PublicServersArgs
  ): Promise<Server[]> {
    return publicServers(ctx, args)
  }

  @Query(() => [ServerUser])
  async serverUsers(
    @Ctx() ctx: Context,
    @Arg('serverId', () => ID) serverId: string
  ): Promise<ServerUser[]> {
    return serverUsers(ctx, serverId)
  }

  @Query(() => Server, { nullable: true })
  async server(@Ctx() ctx: Context, @Args() args: ServerArgs): Promise<Server> {
    return server(ctx, args)
  }

  // --- Mutations ---
  @Authorized()
  @Mutation(() => Server)
  async createServer(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateServerInput
  ): Promise<Server> {
    return createServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Server)
  async updateServer(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateServerInput
  ): Promise<Server> {
    return updateServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => ID)
  async deleteServer(
    @Ctx() ctx: Context,
    @Arg('input') input: DeleteServerInput
  ): Promise<string> {
    return deleteServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Server)
  async joinServer(
    @Ctx() ctx: Context,
    @Arg('input') input: JoinServerInput,
    @PubSub(SubscriptionTopic.MessageChanged)
    notifyMessageChanged: Publisher<ChangePayload>
  ): Promise<Server> {
    return joinServer(ctx, input, notifyMessageChanged)
  }

  @Authorized()
  @Mutation(() => Server)
  async leaveServer(
    @Ctx() ctx: Context,
    @Arg('input') input: LeaveServerInput
  ): Promise<Server> {
    return leaveServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => GraphQLVoid)
  async moveServer(
    @Ctx() ctx: Context,
    @Arg('input') input: MoveServerInput
  ): Promise<void> {
    return moveServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Server)
  async readServer(
    @Ctx() ctx: Context,
    @Arg('input') input: ReadServerInput
  ): Promise<Server> {
    return readServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async banUserFromServer(
    @Ctx() ctx: Context,
    @Arg('input') input: BanUserFromServerInput
  ): Promise<boolean> {
    return banUserFromServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unbanUserFromServer(
    @Ctx() ctx: Context,
    @Arg('input') input: UnbanUserFromServerInput
  ): Promise<boolean> {
    return unbanUserFromServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async kickUserFromServer(
    @Ctx() ctx: Context,
    @Arg('input') input: KickUserFromServerInput
  ): Promise<boolean> {
    return kickUserFromServer(ctx, input)
  }

  @Authorized('ADMIN')
  @Mutation(() => Server)
  async featureServer(
    @Ctx() ctx: Context,
    @Arg('input') input: FeatureServerInput
  ): Promise<Server> {
    return featureServer(ctx, input)
  }

  @Authorized('ADMIN')
  @Mutation(() => Server)
  async unfeatureServer(
    @Ctx() ctx: Context,
    @Arg('input') input: UnfeatureServerInput
  ): Promise<Server> {
    return unfeatureServer(ctx, input)
  }
}
