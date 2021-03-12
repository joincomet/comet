import {
  Args,
  Authorized,
  Ctx,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql'
import {
  ChatChannel,
  ChatGroup,
  ChatMessage,
  DirectMessage,
  User
} from '@/entity'
import { FilterQuery, QueryOrder } from '@mikro-orm/core'
import { GetMessagesArgs, GetMessagesResponse } from '@/resolver/message'
import { Context } from '@/types'
import { ChannelPermission } from '@/types/ChannelPermission'
import { ServerPermission } from '@/types/ServerPermission'
import { CheckChannelPermission, CheckGroupMember } from '@/util'

@Resolver(() => ChatMessage)
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
    const where: FilterQuery<ChatMessage> = {
      isDeleted: false,
      isRemoved: false
    }
    if (pinned) where.isPinned = true
    if (channelId) {
      where.channel = await em.findOneOrFail(ChatChannel, channelId)
    } else if (groupId) {
      where.group = await em.findOneOrFail(ChatGroup, groupId)
    } else if (userId) {
      const user2 = await em.findOneOrFail(User, userId)
      where.directMessage = await em.findOneOrFail(DirectMessage, {
        $or: [
          { user1: user, user2 },
          { user1: user2, user2: user }
        ]
      })
    }

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
