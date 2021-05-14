import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Resolver,
  Root
} from 'type-graphql'
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
  ReadChannelInput
} from './mutations'
import { GraphQLNonNegativeInt } from 'graphql-scalars'

@Resolver(() => Channel)
export class ChannelResolver {
  // --- Fields ---
  @FieldResolver(() => GraphQLNonNegativeInt)
  async mentionCount(
    @Ctx() { loaders: { channelMentionCountLoader } }: Context,
    @Root() channel: Channel
  ): Promise<number> {
    return channelMentionCountLoader.load(channel.id)
  }

  @FieldResolver(() => Boolean)
  async isUnread(
    @Ctx() { loaders: { channelUnreadLoader } }: Context,
    @Root() channel: Channel
  ): Promise<boolean> {
    return channelUnreadLoader.load(channel.id)
  }

  // --- Mutations ---
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
  @Mutation(() => ID)
  async deleteChannel(
    @Ctx() ctx: Context,
    @Arg('input') input: DeleteChannelInput
  ): Promise<string> {
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
}
