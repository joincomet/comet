import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { ChannelPermission, Message, ServerPermission } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

@InputType()
export class UnpinMessageInput {
  @Field(() => ID)
  messageId: string
}

export async function unpinMessage(
  { em, user }: Context,
  { messageId }: UnpinMessageInput,
  notifyMessageChanged: Publisher<ChangePayload>
): Promise<Message> {
  const message = await em.findOneOrFail(Message, messageId, ['channel'])
  if (message.channel) {
    await user.checkChannelPermission(
      em,
      message.channel.id,
      ChannelPermission.ManageMessages,
      ServerPermission.ManageMessages
    )
  }
  message.isPinned = false
  message.pinnedAt = null
  await em.persistAndFlush(message)
  await notifyMessageChanged({ id: messageId, type: ChangeType.Updated })
  return message
}
