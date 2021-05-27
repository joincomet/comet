import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Message, ServerPermission, User } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import {logger} from "@/util";

@InputType()
export class PinMessageInput {
  @Field(() => ID)
  messageId: string
}

export async function pinMessage(
  { em, userId }: Context,
  { messageId }: PinMessageInput,
  notifyMessageChanged: Publisher<ChangePayload>
): Promise<Message> {
  logger('pinMessage')
  const user = await em.findOneOrFail(User, userId)
  const message = await em.findOneOrFail(Message, messageId, ['channel'])
  if (message.channel) {
    await user.checkServerPermission(
      em,
      message.channel.server.id,
      ServerPermission.ManageMessages
    )
  }
  message.isPinned = true
  message.pinnedAt = new Date()
  await em.persistAndFlush(message)
  await notifyMessageChanged({ id: messageId, type: ChangeType.Updated })
  return message
}
