import { Authorized, Ctx, Resolver, Root, Subscription } from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { canViewChannelFilter } from '@/resolver/channel/subscriptions'
import { ChannelResponse } from './subscriptions/ChannelResponse'
import { ChannelPayload } from './subscriptions/ChannelPayload'
import { ChannelDeletedResponse } from '@/resolver/channel/subscriptions'
import { Channel } from '@/entity'
import { getServerChannels } from '@/resolver/channel/queries/getServerChannels'
import { ChannelUserPayload } from '@/resolver/channel/mutations'
import { currentUserFilter } from '@/util/currentUserFilter'

@Resolver()
export class ChannelSubscriptions {
  @Authorized()
  @Subscription(() => ChannelResponse, {
    topics: SubscriptionTopic.ChannelCreated,
    filter: canViewChannelFilter
  })
  async channelCreated(
    @Ctx() { em }: Context,
    @Root() { channelId, serverId }: ChannelPayload
  ): Promise<ChannelResponse> {
    return {
      channel: await em.findOneOrFail(Channel, channelId),
      serverId
    } as ChannelResponse
  }

  @Authorized()
  @Subscription(() => Channel, {
    topics: SubscriptionTopic.ChannelUpdated,
    filter: canViewChannelFilter
  })
  async channelUpdated(
    @Ctx() { em }: Context,
    @Root() { channelId }: { channelId: string }
  ): Promise<Channel> {
    return em.findOneOrFail(Channel, channelId)
  }

  @Authorized()
  @Subscription(() => ChannelDeletedResponse, {
    topics: SubscriptionTopic.ChannelDeleted,
    filter: canViewChannelFilter
  })
  channelDeleted(
    @Root() { channelId, serverId }: ChannelPayload
  ): ChannelDeletedResponse {
    return { channelId, serverId }
  }

  @Authorized()
  @Subscription(() => [Channel], {
    topics: SubscriptionTopic.ChannelsReordered,
    filter: canViewChannelFilter
  })
  async channelsReordered(
    @Ctx() ctx: Context,
    @Root() { serverId }: { serverId: string }
  ): Promise<Channel[]> {
    return getServerChannels(ctx, serverId)
  }

  @Authorized()
  @Subscription(() => Channel, {
    topics: SubscriptionTopic.ChannelRead,
    filter: currentUserFilter
  })
  async channelRead(
    @Ctx() { em }: Context,
    @Root() { channelId }: ChannelUserPayload
  ): Promise<Channel> {
    return em.findOneOrFail(Channel, channelId)
  }
}
