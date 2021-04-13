import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Resolver
} from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { Channel } from '@/entity'
import { CreateChannelArgs } from './mutations/createChannel'
import { createChannel } from './mutations/createChannel'
import { deleteChannel } from './mutations/deleteChannel'
import { EditChannelArgs, editChannel } from './mutations/editChannel'
import {
  ReorderChannelArgs,
  reorderChannels
} from '@/resolver/channel/mutations/reorderChannels'
import { ChannelUserPayload, readChannel } from '@/resolver/channel/mutations'

@Resolver()
export class ChannelMutations {
  @Authorized()
  @Mutation(() => Channel)
  async createChannel(
    @Ctx() ctx: Context,
    @Args() args: CreateChannelArgs,
    @PubSub(SubscriptionTopic.ChannelsUpdated)
    notifyChannelsUpdated: Publisher<{ serverId: string }>
  ): Promise<Channel> {
    return createChannel(ctx, args, notifyChannelsUpdated)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteChannel(
    @Ctx() ctx: Context,
    @Arg('channelId', () => ID) channelId: string,
    @PubSub(SubscriptionTopic.ChannelsUpdated)
    notifyChannelsUpdated: Publisher<{ serverId: string }>
  ): Promise<boolean> {
    return deleteChannel(ctx, channelId, notifyChannelsUpdated)
  }

  @Authorized()
  @Mutation(() => Channel)
  async editChannel(
    @Ctx() ctx: Context,
    @Args() args: EditChannelArgs,
    @PubSub(SubscriptionTopic.ChannelUpdated)
    notifyChannelUpdated: Publisher<{ channelId: string }>
  ): Promise<Channel> {
    return editChannel(ctx, args, notifyChannelUpdated)
  }

  @Authorized()
  @Mutation(() => [Channel])
  async reorderChannels(
    @Ctx() ctx: Context,
    @Args() args: ReorderChannelArgs,
    @PubSub(SubscriptionTopic.ChannelsUpdated)
    notifyChannelsUpdated: Publisher<{ serverId: string }>
  ): Promise<Channel[]> {
    return reorderChannels(ctx, args, notifyChannelsUpdated)
  }

  @Authorized()
  @Mutation(() => Channel)
  async readChannel(
    @Ctx() ctx: Context,
    @Arg('channelId', () => ID) channelId: string,
    @PubSub(SubscriptionTopic.ChannelRead)
    notifyChannelRead: Publisher<ChannelUserPayload>
  ): Promise<Channel> {
    return readChannel(ctx, channelId, notifyChannelRead)
  }
}
