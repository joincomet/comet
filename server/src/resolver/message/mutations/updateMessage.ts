import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import { Message, User } from '@/entity'
import {handleText, logger} from '@/util'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'

@InputType()
export class UpdateMessageInput {
  @Field(() => ID)
  messageId: string

  @Field()
  @Length(1, 100000)
  text: string
}

export async function updateMessage(
  { em, userId }: Context,
  { messageId, text }: UpdateMessageInput,
  notifyMessageChanged: Publisher<ChangePayload>
): Promise<Message> {
  logger('updateMessage')
  const message = await em.findOneOrFail(Message, messageId, ['author'])
  if (message.author !== em.getReference(User, userId))
    throw new Error('Must be author to edit')
  message.text = handleText(text)
  await em.persistAndFlush(message)
  await notifyMessageChanged({ id: messageId, type: ChangeType.Updated })
  return message
}
