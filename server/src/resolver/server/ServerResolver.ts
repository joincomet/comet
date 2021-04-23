import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
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
import { Context, NotificationSetting } from '@/types'
import { publicServers, PublicServersArgs } from './queries'
import {
  banUserFromServer,
  BanUserFromServerInput,
  changeNickname,
  ChangeNicknameInput,
  changeNotificationSetting,
  ChangeNotificationSettingInput,
  createServer,
  CreateServerInput,
  deleteServer,
  DeleteServerInput,
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
  updateServer,
  UpdateServerInput
} from './mutations'
import { GraphQLNonNegativeInt, GraphQLVoid } from 'graphql-scalars'

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
  async myRoles(
    @Ctx() { loaders: { serverMyRolesLoader } }: Context,
    @Root() server: Server
  ): Promise<Role[]> {
    return serverMyRolesLoader.load(server.id)
  }

  @FieldResolver(() => [Role])
  async roles(
    @Ctx() { loaders: { serverRolesLoader } }: Context,
    @Root() server: Server
  ): Promise<Role[]> {
    return serverRolesLoader.load(server.id)
  }

  @FieldResolver()
  async nickname(
    @Ctx() { loaders: { serverNicknameLoader } }: Context,
    @Root() server: Server
  ): Promise<string> {
    return serverNicknameLoader.load(server.id)
  }

  @FieldResolver(() => NotificationSetting)
  async notificationSetting(
    @Ctx() { loaders: { serverNotificationSettingLoader } }: Context,
    @Root() server: Server
  ): Promise<NotificationSetting> {
    return serverNotificationSettingLoader.load(server.id)
  }

  @FieldResolver(() => [ServerPermission])
  async permissions(
    @Ctx() { loaders: { serverPermissionsLoader } }: Context,
    @Root() server: Server
  ): Promise<ServerPermission[]> {
    return serverPermissionsLoader.load(server.id)
  }

  @FieldResolver(() => Channel)
  async systemMessagesChannel(
    @Ctx() { loaders: { serverSystemMessagesChannelLoader } }: Context,
    @Root() server: Server
  ): Promise<Channel> {
    return serverSystemMessagesChannelLoader.load(server.id)
  }

  @FieldResolver(() => GraphQLNonNegativeInt)
  async onlineCount(
    @Ctx() { loaders: { serverOnlineCountLoader } }: Context,
    @Root() server: Server
  ): Promise<number> {
    return serverOnlineCountLoader.load(server.id)
  }

  // --- Queries ---
  @Authorized()
  @Query(() => [Server])
  async publicServers(
    @Ctx() ctx: Context,
    @Args() args: PublicServersArgs
  ): Promise<Server[]> {
    return publicServers(ctx, args)
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
  @Mutation(() => Boolean)
  async deleteServer(
    @Ctx() ctx: Context,
    @Arg('input') input: DeleteServerInput
  ): Promise<boolean> {
    return deleteServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Server)
  async joinServer(
    @Ctx() ctx: Context,
    @Arg('input') input: JoinServerInput
  ): Promise<Server> {
    return joinServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async leaveServer(
    @Ctx() ctx: Context,
    @Arg('input') input: LeaveServerInput
  ): Promise<boolean> {
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
  @Mutation(() => ServerUser)
  async changeNickname(
    @Ctx() ctx: Context,
    @Arg('input') input: ChangeNicknameInput
  ): Promise<ServerUser> {
    return changeNickname(ctx, input)
  }

  @Authorized()
  @Mutation(() => ServerUser)
  async changeNotificationSetting(
    @Ctx() ctx: Context,
    @Arg('input') input: ChangeNotificationSettingInput
  ): Promise<ServerUser> {
    return changeNotificationSetting(ctx, input)
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
}
