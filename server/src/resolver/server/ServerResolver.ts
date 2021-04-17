import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'
import { Server, ServerUser } from '@/entity'
import { Context } from '@/types'
import { publicServers, PublicServersArgs } from '@/resolver/server/queries'
import {
  CreateServerInput,
  JoinServerInput,
  UpdateServerInput,
  createServer,
  joinServer,
  updateServer
} from '@/resolver/server/mutations'
import { DeleteServerInput } from '@/resolver/server/mutations/deleteServer'
import { LeaveServerInput } from '@/resolver/server/mutations/leaveServer'
import { MoveServerInput } from '@/resolver/server/mutations/moveServer'
import { ReadServerInput } from '@/resolver/server/mutations/readServer'
import { ChangeNicknameInput } from '@/resolver/server/mutations/changeNickname'
import { ChangeNotificationSettingInput } from '@/resolver/server/mutations/changeNotificationSetting'
import { BanUserFromServerInput } from '@/resolver/server/mutations/banUserFromServer'
import { UnbanUserFromServerInput } from '@/resolver/server/mutations/unbanUserFromServer'
import { KickUserFromServerInput } from '@/resolver/server/mutations/kickUserFromServer'

@Resolver(() => Server)
export class ServerResolver {
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
  @Mutation(() => Server)
  async deleteServer(
    @Ctx() ctx: Context,
    @Arg('input') input: DeleteServerInput
  ): Promise<Server> {
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
  @Mutation(() => Server)
  async leaveServer(
    @Ctx() ctx: Context,
    @Arg('input') input: LeaveServerInput
  ): Promise<Server> {
    return leaveServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Server)
  async moveServer(
    @Ctx() ctx: Context,
    @Arg('input') input: MoveServerInput
  ): Promise<Server> {
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
  @Mutation(() => Server)
  async changeNickname(
    @Ctx() ctx: Context,
    @Arg('input') input: ChangeNicknameInput
  ): Promise<Server> {
    return changeNickname(ctx, input)
  }

  @Authorized()
  @Mutation(() => Server)
  async changeNotificationSetting(
    @Ctx() ctx: Context,
    @Arg('input') input: ChangeNotificationSettingInput
  ): Promise<Server> {
    return changeNotificationSetting(ctx, input)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async banUserFromServer(
    @Ctx() ctx: Context,
    @Arg('input') input: BanUserFromServerInput
  ): Promise<Server> {
    return banUserFromServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async unbanUserFromServer(
    @Ctx() ctx: Context,
    @Arg('input') input: UnbanUserFromServerInput
  ): Promise<Server> {
    return unbanUserFromServer(ctx, input)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async kickUserFromServer(
    @Ctx() ctx: Context,
    @Arg('input') input: KickUserFromServerInput
  ): Promise<Server> {
    return kickUserFromServer(ctx, input)
  }
}
