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
import { Channel, FriendData, Group, Message, User } from '@/entity'
import { scrapeMetadata } from '@/util/metascraper'
import {
  ChannelPermission,
  Context,
  ServerPermission,
  SubscriptionTopic
} from '@/types'
import {
  CheckChannelPermission,
  CheckGroupMember,
  CheckMessageAuthor,
  CheckMessageChannelPermission
} from '@/util'
import { SendMessageArgs, MessageSentPayload } from '@/resolver/message'
import { FriendStatus } from '@/resolver/friend'

@Resolver()
export class MessageMutations {
  @CheckChannelPermission(
    ChannelPermission.SendMessages,
    ServerPermission.SendMessages
  )
  @CheckGroupMember()
  @Mutation(() => Boolean, { description: 'Create a chat message' })
  async sendMessage(
    @Ctx() { user, em }: Context,
    @Args() { text, channelId, groupId, userId }: SendMessageArgs,
    @PubSub(SubscriptionTopic.MessageSent)
    messageSent: Publisher<MessageSentPayload>,
    @PubSub(SubscriptionTopic.RefetchGroupsAndDms)
    refetchGroupsAndDms: Publisher<string>
  ): Promise<boolean> {
    const channel = channelId
      ? await em.findOneOrFail(Channel, channelId)
      : null
    const group = groupId ? await em.findOneOrFail(Group, groupId) : null
    const toUser = userId ? await em.findOneOrFail(User, userId) : null

    if (toUser) {
      const [myData, theirData] = await user.getFriendData(em, userId)
      if (myData.status === FriendStatus.Blocked)
        throw new Error('This user has blocked you')
      if (myData.status === FriendStatus.Blocking)
        throw new Error('You are blocking this user')
    }

    const message = em.create(Message, {
      text,
      channel,
      group,
      toUser,
      author: user
    })

    message.linkMetadatas = await this.getLinkMetas(message)
    await em.persistAndFlush(message)

    if (toUser) {
      const [myData, theirData] = await user.getFriendData(em, userId)
      myData.showChat = true
      myData.lastMessageAt = new Date()
      theirData.showChat = true
      theirData.lastMessageAt = new Date()
      await em.persistAndFlush([myData, theirData])
      await refetchGroupsAndDms(user.id)
      await refetchGroupsAndDms(toUser.id)
    }

    if (group) {
      group.lastMessageAt = new Date()
    }

    if (channel) {
      channel.lastMessageAt = new Date()
    }

    await messageSent({
      messageId: message.id,
      fromUserId: user.id,
      toUserId: toUser?.id,
      groupId: group?.id,
      channelId: channel?.id
    })

    return true
  }

  @CheckMessageAuthor()
  @Mutation(() => Boolean)
  async editMessage(
    @Arg('text', { description: 'New message text' }) text: string,
    @Arg('messageId', () => ID, { description: 'ID of message to edit' })
    messageId: string,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<MessageSentPayload>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    if (!text) throw new Error('Text cannot be empty')
    const message = await em.findOneOrFail(Message, messageId, [
      'author',
      'toUser',
      'group',
      'channel'
    ])
    message.text = text
    message.linkMetadatas = await this.getLinkMetas(message)
    await em.persistAndFlush(message)
    await messageUpdated({
      messageId: message.id,
      fromUserId: user.id,
      toUserId: message.toUser?.id,
      groupId: message.group?.id,
      channelId: message.channel?.id
    })
    return true
  }

  @CheckMessageAuthor()
  @Mutation(() => Boolean, { description: 'Delete a message' })
  async deleteMessage(
    @Arg('messageId', () => ID, { description: 'ID of message to delete' })
    messageId: string,
    @PubSub(SubscriptionTopic.MessageRemoved)
    messageRemoved: Publisher<MessageSentPayload>,
    @Ctx() { user, em }: Context
  ): Promise<boolean> {
    const message = await em.findOneOrFail(Message, messageId, [
      'author',
      'toUser',
      'group',
      'channel'
    ])
    message.isDeleted = true
    await em.persistAndFlush(message)
    await messageRemoved({
      messageId: message.id,
      fromUserId: user.id,
      toUserId: message.toUser?.id,
      groupId: message.group?.id,
      channelId: message.channel?.id
    })
    return true
  }

  @CheckMessageChannelPermission(
    ChannelPermission.ManageMessages,
    ServerPermission.ManageMessages
  )
  @Mutation(() => Boolean, {
    description:
      'Remove a message (requires ChannelPermission.ManageMessages or ServerPermission.ManageMessages)'
  })
  async removeMessage(
    @Arg('messageId', () => ID, { description: 'ID of message to remove' })
    messageId: string,
    @PubSub(SubscriptionTopic.MessageRemoved)
    messageRemoved: Publisher<Message>,
    @Ctx() { em }: Context
  ): Promise<boolean> {
    const message = await em.findOneOrFail(Message, messageId)
    message.isDeleted = true
    await em.persistAndFlush(message)
    await messageRemoved(message)
    return true
  }

  @Authorized()
  @Mutation(() => Boolean)
  async hideDm(
    @Ctx() { em, user }: Context,
    @Arg('userId', () => ID) userId: string,
    @PubSub(SubscriptionTopic.RefetchGroupsAndDms)
    refetchGroupsAndDms: Publisher<string>
  ) {
    const toUser = await em.findOneOrFail(User, userId)
    const dm = await em.findOne(FriendData, { user, toUser })
    if (!dm) return true
    dm.showChat = false
    await em.persistAndFlush(dm)
    await refetchGroupsAndDms(user.id)
    return true
  }

  async getLinkMetas(message: Message) {
    const linkRegex = /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/gi
    const links = message.text.match(linkRegex) || []
    const linkMetadatas = []
    for (const link of links) {
      const meta = await scrapeMetadata(link)
      if (meta) linkMetadatas.push(meta)
    }
    return linkMetadatas
  }
}
