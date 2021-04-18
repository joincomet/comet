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
import { Channel, Folder, Server, ServerUser } from '@/entity'
import { Context } from '@/types'
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

@Resolver(() => Server)
export class ServerResolver {
  @FieldResolver(() => [Channel])
  async channels(
    @Ctx() { em, user, loaders: { channelLoader } }: Context,
    @Root() server: Server
  ): Promise<Channel[]> {
    return channelLoader.load(server.id)
  }

  @FieldResolver(() => [Folder])
  async folders(
    @Ctx() { em, user, loaders: { serverFoldersLoader } }: Context,
    @Root() server: Server
  ): Promise<Folder[]> {
    return serverFoldersLoader.load(server.id)
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
  @Mutation(() => ServerUser)
  async moveServer(
    @Ctx() ctx: Context,
    @Arg('input') input: MoveServerInput
  ): Promise<ServerUser> {
    return moveServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => ServerUser)
  async readServer(
    @Ctx() ctx: Context,
    @Arg('input') input: ReadServerInput
  ): Promise<ServerUser> {
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
