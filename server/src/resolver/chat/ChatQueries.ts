import { Arg, Args, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { ChatChannel, ChatMessage } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'
import { GetMessagesResponse } from '@/resolver/chat'
import { Context, PaginationArgs } from '@/types'
import { ChannelPermission } from '@/types/ChannelPermission'
import { ServerPermission } from '@/types/ServerPermission'

@Resolver(() => ChatMessage)
export class ChatQueries {
  @Authorized([ChannelPermission.ViewChannel, ServerPermission.ViewChannels])
  @Query(() => GetMessagesResponse)
  async getMessages(
    @Args() { page, pageSize }: PaginationArgs,
    @Arg('channelId', () => ID) channelId: string,
    @Ctx() { user, em }: Context
  ) {
    const channel = await em.findOneOrFail(ChatChannel, channelId, [
      'group.users'
    ])
    const err = new Error(`You do not have access to this channel`)
    if (channel.group && !channel.group.users.contains(user)) throw err

    return {
      messages: (
        await em.find(
          ChatMessage,
          { removed: false, deleted: false, channel: { id: channelId } },
          {
            limit: pageSize,
            offset: page * pageSize,
            orderBy: { createdAt: QueryOrder.DESC }
          }
        )
      ).reverse(),
      page,
      nextPage: page + 1
    }
  }
}
