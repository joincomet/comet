import { ArgsType, Field, ID, InputType, Publisher } from 'type-graphql'
import { ChangePayload, ChangeType } from '@/subscriptions'
import { Context } from '@/types'
import { Reply } from '@/entity'

@InputType()
export class UpdateReplyInput {
  @Field(() => ID)
  replyId: string

  @Field({ nullable: true })
  isRead?: boolean
}

export async function updateReply(
  { em, user }: Context,
  { replyId, isRead }: UpdateReplyInput,
  notifyReplyChanged: Publisher<ChangePayload>
): Promise<Reply> {
  await notifyReplyChanged({ id: replyId, type: ChangeType.Updated })
}
