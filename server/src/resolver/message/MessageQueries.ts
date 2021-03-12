import { Arg, Args, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { ChatChannel, ChatMessage } from '@/entity'
import { FilterQuery, QueryOrder } from '@mikro-orm/core'
import { GetMessagesResponse } from '@/resolver/message'
import { Context, PaginationArgs } from '@/types'
import { ChannelPermission } from '@/types/ChannelPermission'
import { ServerPermission } from '@/types/ServerPermission'

@Resolver(() => ChatMessage)
export class MessageQueries {
  @Authorized([ChannelPermission.ViewChannel, ServerPermission.ViewChannels])
  @Query(() => GetMessagesResponse, {
    description:
      'Get messages in a channel (requires ChannelPermission.ViewChannel or ServerPermission.ViewChannels)'
  })
  async getMessages(
    @Ctx() { em }: Context,
    @Args() { page, pageSize }: PaginationArgs,
    @Arg('channelId', () => ID, {
      description: 'ID of channel from which to retrieve messages'
    })
    channelId: string,
    @Arg('isPinned', {
      defaultValue: false,
      description: 'Return only pinned messages'
    })
    isPinned: boolean
  ) {
    const channel = await em.findOneOrFail(ChatChannel, channelId, ['group'])

    const where: FilterQuery<ChatMessage> = {
      isDeleted: false,
      isRemoved: false,
      channel
    }
    if (isPinned) where.isPinned = true

    return {
      messages: (
        await em.find(ChatMessage, where, {
          limit: pageSize,
          offset: page * pageSize,
          orderBy: { createdAt: QueryOrder.DESC }
        })
      ).reverse(),
      page,
      nextPage: page + 1
    }
  }
}
