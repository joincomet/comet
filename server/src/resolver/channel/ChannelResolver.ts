import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { Context } from '@/types'
import { Channel, Role } from '@/entity'
import {
  createChannel,
  CreateChannelInput,
  updateChannel,
  UpdateChannelInput,
  deleteChannel,
  DeleteChannelInput,
  moveChannel,
  MoveChannelInput,
  readChannel,
  ReadChannelInput,
  updateChannelPermissions,
  UpdateChannelPermissionsInput
} from './mutations'

@Resolver(() => Channel)
export class ChannelResolver {
  @Authorized()
  @Mutation(() => Channel)
  async createChannel(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateChannelInput
  ): Promise<Channel> {
    return createChannel(ctx, input)
  }

  @Authorized()
  @Mutation(() => Channel)
  async updateChannel(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateChannelInput
  ): Promise<Channel> {
    return updateChannel(ctx, input)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteChannel(
    @Ctx() ctx: Context,
    @Arg('input') input: DeleteChannelInput
  ): Promise<boolean> {
    return deleteChannel(ctx, input)
  }

  @Authorized()
  @Mutation(() => Channel)
  async moveChannel(
    @Ctx() ctx: Context,
    @Arg('input') input: MoveChannelInput
  ): Promise<Channel> {
    return moveChannel(ctx, input)
  }

  @Authorized()
  @Mutation(() => Channel)
  async readChannel(
    @Ctx() ctx: Context,
    @Arg('input') input: ReadChannelInput
  ): Promise<Channel> {
    return readChannel(ctx, input)
  }

  @Authorized()
  @Mutation(() => Role)
  async updateChannelPermissions(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateChannelPermissionsInput
  ): Promise<Role> {
    return updateChannelPermissions(ctx, input)
  }
}
