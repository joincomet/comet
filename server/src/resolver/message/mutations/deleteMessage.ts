import { Field, ID, InputType, Publisher } from 'type-graphql'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Context } from '@/types'
import { Message, ServerPermission, User } from '@/entity'
import {logger} from "@/util";

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
  logger('deleteMessage')
  const user = await em.findOneOrFail(User, userId)
  const message = await em.findOneOrFail(Message, messageId, [
    'author',
    'channel.server'
  ])
  if (message.author !== user) {
    if (message.channel) {
      await user.checkServerPermission(
        em,
        message.channel.server.id,
        ServerPermission.ManageMessages
      )
    } else throw new Error('Must be author to delete message')
  }
  message.isDeleted = true
  await em.persistAndFlush(message)
  await notifyMessageChanged({ id: messageId, type: ChangeType.Deleted })
  return true
}
