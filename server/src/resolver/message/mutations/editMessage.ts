import { MessagePayload } from '@/resolver/message/subscriptions/MessagePayload'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Length } from 'class-validator'
import { Context } from '@/types'
import { Message } from '@/entity'
import { getLinkMetas } from '@/util/getLinkMetas'

@ArgsType()
export class EditMessageArgs {
  @Field(() => ID)
  messageId: string

  @Field()
  @Length(1, 10000)
  text: string
}

export async function editMessage(
  { em, user }: Context,
  { messageId, text }: EditMessageArgs,
  notifyMessageUpdated: Publisher<MessagePayload>
): Promise<Message> {
  if (!text) throw new Error('error.message.empty')
  const message = await em.findOneOrFail(Message, messageId, [
    'author',
    'toUser',
    'group',
    'channel'
  ])
  message.text = text
  message.linkMetadatas = await getLinkMetas(text)
  await em.persistAndFlush(message)
  await notifyMessageUpdated({
    messageId: message.id,
    fromUserId: user.id,
    toUserId: message.toUser?.id,
    groupId: message.group?.id,
    channelId: message.channel?.id
  })
  return message
}
