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
import {
  Channel,
  File,
  FriendData,
  Group,
  Image,
  Message,
  User
} from '@/entity'
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
  uploadFileOrImage
} from '@/util'
import {
  MessageSentPayload,
  SendMessageArgs,
  TypingArgs,
  TypingPayload
} from '@/resolver/message'
import { FriendStatus } from '@/resolver/user'
import { ChannelUser } from '@/entity/ChannelUser'
import { GroupUser } from '@/entity/GroupUser'

@Resolver()
export class MessageMutations {
  @CheckChannelPermission(
    ChannelPermission.SendMessages,
    ServerPermission.SendMessages
  )
  @CheckGroupMember()
  @Mutation(() => Message, { description: 'Create a chat message' })
  async sendMessage(
    @Ctx() { user, em }: Context,
    @Args() { text, file, channelId, groupId, userId }: SendMessageArgs,
    @PubSub(SubscriptionTopic.MessageSent)
    messageSent: Publisher<MessageSentPayload>,
    @PubSub(SubscriptionTopic.RefetchGroupsAndDms)
    refetchGroupsAndDms: Publisher<string>
  ): Promise<Message> {
    if (!text && !file) throw new Error('error.message.textOrFile')

    const channel = channelId
      ? await em.findOneOrFail(Channel, channelId, ['server'])
      : null
    const group = groupId ? await em.findOneOrFail(Group, groupId) : null
    const toUser = userId ? await em.findOneOrFail(User, userId) : null

    if (toUser) {
      const [myData, theirData] = await user.getFriendData(em, userId)
      if (myData.status === FriendStatus.Blocked)
        throw new Error('error.user.blocked')
      if (myData.status === FriendStatus.Blocking)
        throw new Error('error.user.blocking')
    }

    let upload: File | Image | null = null
    if (file) {
      upload = await uploadFileOrImage(file)
    }

    const message = em.create(Message, {
      text,
      channel,
      group,
      toUser,
      author: user,
      image: upload && (upload as Image).originalUrl ? upload : null,
      file: upload && (upload as File).url ? upload : null
    })

    if (text) message.linkMetadatas = await this.getLinkMetas(message)
    await em.persistAndFlush(message)

    if (toUser) {
      const [myData, theirData] = await user.getFriendData(em, userId)
      myData.showChat = true
      myData.lastMessageAt = new Date()
      theirData.showChat = true
      theirData.lastMessageAt = new Date()
      theirData.unreadCount++
      await em.persistAndFlush([myData, theirData])
      await refetchGroupsAndDms(user.id)
      await refetchGroupsAndDms(toUser.id)
    }

    if (group) {
      group.lastMessageAt = new Date()
      const groupUsers = await em.find(GroupUser, {
        group,
        user: { $ne: user }
      })
      groupUsers.forEach(gu => gu.unreadCount++)
      await em.persistAndFlush(groupUsers)
    }

    if (channel) {
      channel.lastMessageAt = new Date()
      await em.persistAndFlush(channel)
    }

    await messageSent({
      messageId: message.id,
      fromUserId: user.id,
      toUserId: toUser?.id,
      groupId: group?.id,
      channelId: channel?.id,
      serverId: channel?.server?.id
    })

    return message
  }

  @CheckMessageAuthor()
  @Mutation(() => Message)
  async editMessage(
    @Arg('text', { description: 'New message text' }) text: string,
    @Arg('messageId', () => ID, { description: 'ID of message to edit' })
    messageId: string,
    @PubSub(SubscriptionTopic.MessageUpdated)
    messageUpdated: Publisher<MessageSentPayload>,
    @Ctx() { user, em }: Context
  ): Promise<Message> {
    if (!text) throw new Error('error.message.empty')
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
    return message
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

  @Authorized()
  @Mutation(() => Boolean)
  async hideDm(
    @Ctx() { em, user }: Context,
    @Arg('userId', () => ID) userId: string,
    @PubSub(SubscriptionTopic.RefetchGroupsAndDms)
    refetchGroupsAndDms: Publisher<string>
  ): Promise<boolean> {
    const toUser = await em.findOneOrFail(User, userId)
    const dm = await em.findOne(FriendData, { user, toUser })
    if (!dm) return true
    dm.showChat = false
    await em.persistAndFlush(dm)
    await refetchGroupsAndDms(user.id)
    return true
  }

  @CheckChannelPermission(ChannelPermission.SendMessages)
  @CheckGroupMember()
  @Mutation(() => Boolean)
  async startTyping(
    @Ctx() { user, em }: Context,
    @PubSub(SubscriptionTopic.Typing)
    userStartedTyping: Publisher<TypingPayload>,
    @Args() { channelId, groupId, userId }: TypingArgs
  ): Promise<boolean> {
    await userStartedTyping({
      username: user.username,
      userId,
      groupId,
      channelId
    })
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

  @Authorized()
  @Mutation(() => Channel)
  async viewChannel(
    @Ctx() { em, user }: Context,
    @Arg('channelId', () => ID) channelId: string
  ): Promise<Channel> {
    const channel = await em.findOneOrFail(Channel, channelId)
    let channelUser = await em.findOne(ChannelUser, { user, channel })
    if (!channelUser) channelUser = em.create(ChannelUser, { user, channel })
    channelUser.lastViewAt = new Date()
    channelUser.mentionCount = 0
    await em.persistAndFlush(channelUser)
    channel.isUnread = false
    channel.mentionCount = 0
    return channel
  }

  @Authorized()
  @Mutation(() => Group)
  async viewGroup(
    @Ctx() { em, user }: Context,
    @Arg('groupId', () => ID) groupId: string
  ): Promise<Group> {
    const group = await em.findOneOrFail(Group, groupId)
    let groupUser = await em.findOne(GroupUser, { user, group })
    if (!groupUser) groupUser = em.create(GroupUser, { user, group })
    groupUser.lastViewAt = new Date()
    groupUser.unreadCount = 0
    await em.persistAndFlush(groupUser)
    group.unreadCount = 0
    return group
  }

  @Authorized()
  @Mutation(() => User)
  async viewDm(
    @Ctx() { em, user }: Context,
    @Arg('userId', () => ID) userId: string
  ): Promise<User> {
    const [myData] = await user.getFriendData(em, userId)
    myData.lastViewAt = new Date()
    myData.unreadCount = 0
    await em.persistAndFlush(myData)
    const them = myData.toUser
    them.unreadCount = 0
    return them
  }
}
