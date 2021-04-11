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
import { CheckServerPermission } from '@/util'
import { Context, ServerPermission, SubscriptionTopic } from '@/types'
import { Channel } from '@/entity'
import { CreateChannelArgs } from './mutations/createChannel'
import { createChannel } from './mutations/createChannel'
import { deleteChannel } from './mutations/deleteChannel'
import { EditChannelArgs, editChannel } from './mutations/editChannel'
import { ChannelPayload } from './subscriptions/ChannelPayload'
import {
  ReorderChannelArgs,
  reorderChannels
} from '@/resolver/channel/mutations/reorderChannels'
import { CheckChannelServerPermission } from '@/util/auth/middlewares/CheckChannelServerPermission'
import { ChannelUserPayload, readChannel } from '@/resolver/channel/mutations'

@Resolver()
export class ChannelMutations {
  @CheckServerPermission(ServerPermission.ManageChannels)
  @Mutation(() => Channel)
  async createChannel(
    @Ctx() ctx: Context,
    @Args() args: CreateChannelArgs,
    @PubSub(SubscriptionTopic.ChannelCreated)
    notifyChannelCreated: Publisher<ChannelPayload>
  ): Promise<Channel> {
    return createChannel(ctx, args, notifyChannelCreated)
  }

  @CheckServerPermission(ServerPermission.ManageChannels)
  @Mutation(() => Boolean)
  async deleteChannel(
    @Ctx() ctx: Context,
    @Arg('channelId', () => ID) channelId: string,
    @PubSub(SubscriptionTopic.ChannelDeleted)
    notifyChannelDeleted: Publisher<ChannelPayload>
  ): Promise<boolean> {
    return deleteChannel(ctx, channelId, notifyChannelDeleted)
  }

  @CheckServerPermission(ServerPermission.ManageChannels)
  @Mutation(() => Channel)
  async editChannel(
    @Ctx() ctx: Context,
    @Args() args: EditChannelArgs,
    @PubSub(SubscriptionTopic.ChannelUpdated)
    notifyChannelUpdated: Publisher<{ channelId: string }>
  ): Promise<Channel> {
    return editChannel(ctx, args, notifyChannelUpdated)
  }

  @CheckChannelServerPermission(ServerPermission.ViewChannels)
  @Mutation(() => [Channel])
  async reorderChannels(
    @Ctx() ctx: Context,
    @Args() args: ReorderChannelArgs,
    @PubSub(SubscriptionTopic.ChannelsReordered)
    notifyChannelsReordered: Publisher<{ serverId: string }>
  ): Promise<Channel[]> {
    return reorderChannels(ctx, args, notifyChannelsReordered)
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
