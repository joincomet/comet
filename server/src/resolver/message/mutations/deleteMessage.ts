import { Field, ID, InputType, Publisher } from 'type-graphql'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Context } from '@/types'
import { ChannelPermission, Message, ServerPermission, User } from '@/entity'

@InputType()
export class DeleteMessageInput {
  @Field(() => ID)
  messageId: string
}

export async function deleteMessage(
  { em, userId }: Context,
  { messageId }: DeleteMessageInput,
  notifyMessageChanged: Publisher<ChangePayload>
): Promise<boolean> {
  const user = await em.findOneOrFail(User, userId)
  const message = await em.findOneOrFail(Message, messageId, [
    'author',
    'channel'
  ])
  if (message.author !== user) {
    if (message.channel) {
      await user.checkChannelPermission(
        em,
        message.channel.id,
        ChannelPermission.ManageMessages
      )
    } else throw new Error('Must be author to delete message')
  }
  message.isDeleted = true
  await em.persistAndFlush(message)
  await notifyMessageChanged({ id: messageId, type: ChangeType.Deleted })
  return true
}
