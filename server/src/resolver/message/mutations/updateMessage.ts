import { Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Message, ServerPermission } from '@/entity'
import { handleText } from '@/util'

@InputType()
export class UpdateMessageInput {
  @Field(() => ID)
  messageId: string

  @Field({ nullable: true })
  text?: string

  @Field({ defaultValue: false })
  isDeleted: boolean = false

  @Field({ nullable: true })
  isPinned?: boolean
}

export async function updateMessage(
  { em, user }: Context,
  { messageId, text, isDeleted, isPinned }: UpdateMessageInput,
  notifyMessageChanged: Publisher<ChangePayload>
): Promise<Message> {
  const message = await em.findOneOrFail(Message, messageId, [
    'author',
    'group',
    'toUser',
    'channel.server.owner',
    'serverUser'
  ])

  if (text != null) {
    if (message.author !== user)
      throw new Error('Must be author to edit message')
    message.text = text ? handleText(text) : null
  }

  if (isDeleted) {
    if (
      message.author === user ||
      (message.channel &&
        (await user.hasServerPermission(
          em,
          message.channel.server.id,
          ServerPermission.ManageMessages
        )))
    ) {
      message.isDeleted = true
    } else
      throw new Error(
        'Must be author or have server permission ManageMessages to delete message'
      )
  }

  if (isPinned) {
    if (
      await user.hasServerPermission(
        em,
        message.channel.id,
        ServerPermission.ManageMessages
      )
    ) {
      message.isPinned = true
    } else throw new Error('Must have ManageMessages permission to pin message')
  }

  await notifyMessageChanged({
    id: messageId,
    type: isDeleted ? ChangeType.Deleted : ChangeType.Updated
  })
  return message
}
