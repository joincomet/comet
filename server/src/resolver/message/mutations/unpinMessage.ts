import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Message, ServerPermission, User } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import {logger} from "@/util";

@InputType()
export class UnpinMessageInput {
  @Field(() => ID)
  messageId: string
}

export async function unpinMessage(
  { em, userId }: Context,
  { messageId }: UnpinMessageInput,
  notifyMessageChanged: Publisher<ChangePayload>
): Promise<Message> {
  logger('unpinMessage')
  const message = await em.findOneOrFail(Message, messageId, ['channel'])
  const user = await em.findOneOrFail(User, userId)
  if (message.channel) {
    await user.checkServerPermission(
      em,
      message.channel.server.id,
      ServerPermission.ManageMessages
    )
  }
  message.isPinned = false
  message.pinnedAt = null
  await em.persistAndFlush(message)
  await notifyMessageChanged({ id: messageId, type: ChangeType.Updated })
  return message
}
