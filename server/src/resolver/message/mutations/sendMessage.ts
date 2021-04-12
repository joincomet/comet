import { Context } from '@/types'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Channel, File, Group, GroupUser, Image, Message, User } from '@/entity'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { MessagePayload } from '@/resolver/message/subscriptions/MessagePayload'
import { DmPayload } from '@/resolver/message/subscriptions/DmPayload'
import { FriendStatus } from '@/resolver/user'
import { uploadFileOrImage } from '@/util'
import { getLinkMetas } from '@/util/getLinkMetas'

@ArgsType()
export class SendMessageArgs {
  @Field({ nullable: true })
  text?: string

  @Field(() => GraphQLUpload, { nullable: true })
  file?: FileUpload

  @Field(() => ID, { nullable: true })
  channelId?: string

  @Field(() => ID, { nullable: true })
  groupId?: string

  @Field(() => ID, { nullable: true })
  userId?: string
}

export async function sendMessage(
  { em, user }: Context,
  { text, file, userId, groupId, channelId }: SendMessageArgs,
  notifyMessageSent: Publisher<MessagePayload>,
  notifyDmOpened: Publisher<DmPayload>
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

  if (text) message.linkMetadatas = await getLinkMetas(text)
  await em.persistAndFlush(message)

  if (toUser) {
    const [myData, theirData] = await user.getFriendData(em, userId)
    myData.showChat = true
    myData.lastMessageAt = new Date()
    theirData.showChat = true
    theirData.lastMessageAt = new Date()
    theirData.unreadCount++
    await em.persistAndFlush([myData, theirData])
    await notifyDmOpened({ userId: user.id, friendId: toUser.id })
    await notifyDmOpened({ userId: toUser.id, friendId: user.id })
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

  await notifyMessageSent({
    messageId: message.id,
    fromUserId: user.id,
    toUserId: toUser?.id,
    groupId: group?.id,
    channelId: channel?.id,
    serverId: channel?.server?.id
  })

  return message
}
