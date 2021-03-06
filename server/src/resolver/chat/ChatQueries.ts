import { Arg, Args, Authorized, Ctx, ID, Query, Resolver } from 'type-graphql'
import { ChatMessage, ChatChannel } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'
import { GetMessagesResponse } from '@/resolver/chat'
import { Context, PaginationArgs } from '@/types'

@Resolver()
export class ChatQueries {
  @Authorized()
  @Query(() => GetMessagesResponse)
  async getMessages(
    @Args() { page, pageSize }: PaginationArgs,
    @Arg('channelId', () => ID) channelId: string,
    @Ctx() { user, em }: Context
  ) {
    const channel = await em.findOne(ChatChannel, channelId, [
      'group.users',
      'server.users'
    ])
    if (!channel) throw new Error(`Channel ${channelId} does not exist`)
    const err = new Error(`You do not have access to this channel`)
    if (channel.group && !channel.group.users.contains(user)) throw err
    else if (channel.server && !channel.server.users.contains(user)) throw err

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
