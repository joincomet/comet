import { ArgsType, Field, ID, InputType, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { ChangePayload, ChangeType } from '@/subscriptions'
import { Message } from '@/entity'

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
  await notifyMessageChanged({
    id: messageId,
    type: isDeleted ? ChangeType.Deleted : ChangeType.Updated
  })
}
