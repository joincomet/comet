import { Args, Ctx, Publisher, PubSub, Query, Resolver } from 'type-graphql'
import { Channel, Group, Message, User } from '@/entity'
import { FilterQuery, QueryOrder } from '@mikro-orm/core'
import { GetMessagesArgs, GetMessagesResponse } from '@/resolver/message'
import { Context, SubscriptionTopic } from '@/types'
import { ChannelPermission } from '@/types/ChannelPermission'
import { ServerPermission } from '@/types/ServerPermission'
import { CheckChannelPermission, CheckGroupMember } from '@/util'

@Resolver(() => Message)
export class MessageQueries {
  @CheckChannelPermission(ChannelPermission.ViewChannel)
  @CheckGroupMember()
  @Query(() => [Message], {
    description:
      'Get messages in a DM, group, or channel (requires ChannelPermission.ViewChannel or' +
      ' ServerPermission.ViewChannels)'
  })
  async getMessages(
    @Ctx() { em, user }: Context,
    @Args()
    {
      initialTime,
      page,
      pageSize,
      pinned,
      channelId,
      groupId,
      userId
    }: GetMessagesArgs,
    @PubSub(SubscriptionTopic.RefetchGroupsAndDms)
    refetchGroupsAndDms: Publisher<string>
  ) {
    const channel = channelId
      ? await em.findOneOrFail(Channel, channelId)
      : null
    const group = groupId ? await em.findOneOrFail(Group, groupId) : null
    const toUser = userId ? await em.findOneOrFail(User, userId) : null

    if (!channel && !group && !toUser)
      throw new Error('Must provide channelId, groupId, or userId')

    const where: FilterQuery<Message> = {
      isDeleted: false,
      isRemoved: false
    }
    if (pinned) where.isPinned = true
    if (channel) {
      where.channel = channel
    } else if (group) {
      where.group = group
    } else if (toUser) {
      const [myData, theirData] = await user.getFriendData(em, userId)
      myData.showChat = true
      await em.persistAndFlush([myData, theirData])
      await refetchGroupsAndDms(user.id)

      where['$or'] = [
        { author: user, toUser },
        { author: toUser, toUser: user }
      ]
    }

    if (initialTime) {
      where.createdAt = {
        $lte: initialTime
      }
    }

    const messages = (
      await em.find(
        Message,
        where,
        ['author'],
        { createdAt: QueryOrder.DESC },
        pageSize,
        page * pageSize
      )
    ).reverse()

    return messages
  }
}
