import { Context } from '@/types'
import { MessagePayload } from '@/resolver/message/subscriptions/MessagePayload'
import { Publisher } from 'type-graphql'
import { Message } from '@/entity'

export async function deleteMessage(
  { em, user }: Context,
  messageId: string,
  notifyMessageDeleted: Publisher<MessagePayload>
): Promise<boolean> {
  const message = await em.findOneOrFail(Message, messageId, [
    'author',
    'toUser',
    'group',
    'channel'
  ])
  message.isDeleted = true
  await em.persistAndFlush(message)
  await notifyMessageDeleted({
    messageId: message.id,
    fromUserId: user.id,
    toUserId: message.toUser?.id,
    groupId: message.group?.id,
    channelId: message.channel?.id
  })
  return true
}
