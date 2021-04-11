import { Args, Ctx, Publisher, PubSub, Query, Resolver } from 'type-graphql'
import { Message } from '@/entity'
import { Context, SubscriptionTopic } from '@/types'
import { ChannelPermission } from '@/types/ChannelPermission'
import { CheckChannelPermission, CheckGroupMember } from '@/util'
import {
  GetMessagesArgs,
  GetMessagesResponse
} from '@/resolver/message/queries/getMessages'
import { DmPayload } from '@/resolver/message/subscriptions/DmPayload'
import { getMessages } from '@/resolver/message/queries/getMessages'

@Resolver(() => Message)
export class MessageQueries {
  @CheckChannelPermission(ChannelPermission.ViewChannel)
  @CheckGroupMember()
  @Query(() => [GetMessagesResponse], {
    description:
      'Get messages in a DM, group, or channel (requires ChannelPermission.ViewChannel or ServerPermission.ViewChannels)'
  })
  async getMessages(
    @Ctx() ctx: Context,
    @Args()
    args: GetMessagesArgs,
    @PubSub(SubscriptionTopic.DmOpened)
    notifyDmOpened: Publisher<DmPayload>
  ): Promise<GetMessagesResponse[]> {
    return getMessages(ctx, args, notifyDmOpened)
  }
}
