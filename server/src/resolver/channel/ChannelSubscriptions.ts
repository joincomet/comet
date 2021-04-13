import { Authorized, Ctx, ID, Resolver, Root, Subscription } from 'type-graphql'
import { Context, SubscriptionTopic } from '@/types'
import { canViewChannelFilter } from '@/resolver/channel/subscriptions'
import { ChannelResponse } from './subscriptions/ChannelResponse'
import { ChannelPayload } from './subscriptions/ChannelPayload'
import { Channel } from '@/entity'
import { ChannelUserPayload } from '@/resolver/channel/mutations'
import { currentUserFilter } from '@/util/currentUserFilter'
import { joinedServerFilter } from '@/util/joinedServerFilter'

@Resolver()
export class ChannelSubscriptions {
  @Authorized()
  @Subscription(() => ChannelResponse, {
    topics: SubscriptionTopic.ChannelsUpdated,
    filter: joinedServerFilter
  })
  async channelsUpdated(
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
  @Subscription(() => ID, {
    topics: SubscriptionTopic.ChannelRead,
    filter: currentUserFilter
  })
  channelRead(@Root() { channelId }: ChannelUserPayload): string {
    return channelId
  }
}
