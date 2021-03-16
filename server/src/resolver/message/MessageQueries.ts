import { Args, Ctx, Query, Resolver } from 'type-graphql'
import { Channel, Group, Message, User } from '@/entity'
import { FilterQuery, QueryOrder } from '@mikro-orm/core'
import { GetMessagesArgs, GetMessagesResponse } from '@/resolver/message'
import { Context } from '@/types'
import { ChannelPermission } from '@/types/ChannelPermission'
import { ServerPermission } from '@/types/ServerPermission'
import { CheckChannelPermission, CheckGroupMember } from '@/util'

@Resolver(() => Message)
export class MessageQueries {
  @CheckChannelPermission(
    ChannelPermission.ViewChannel,
    ServerPermission.ViewChannels
  )
  @CheckGroupMember()
  @Query(() => GetMessagesResponse, {
    description:
      'Get messages in a DM, group, or channel (requires ChannelPermission.ViewChannel or' +
      ' ServerPermission.ViewChannels)'
  })
  async getMessages(
    @Ctx() { em, user }: Context,
    @Args()
    { page, pageSize, pinned, channelId, groupId, userId }: GetMessagesArgs
  ) {
    const where: FilterQuery<Message> = {
      isDeleted: false,
      isRemoved: false
    }
    if (pinned) where.isPinned = true
    if (channelId) {
      where.channel = await em.findOneOrFail(Channel, channelId)
    } else if (groupId) {
      where.group = await em.findOneOrFail(Group, groupId)
    } else if (userId) {
      const toUser = await em.findOneOrFail(User, userId)
      where['$or'] = [
        { author: user, toUser },
        { author: toUser, toUser: user }
      ]
    }

    return {
      messages: (
        await em.find(
          Message,
          where,
          ['author'],
          { createdAt: QueryOrder.DESC },
          pageSize,
          page * pageSize
        )
      ).reverse(),
      page,
      nextPage: page + 1
    }
  }
}
