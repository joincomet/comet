import { Field, ID, InputType, Publisher } from 'type-graphql'
import { ChangeType } from '@/resolver/subscriptions'
import { Context } from '@/types'
import { Reply } from '@/entity'
import { BulkChangePayload } from '@/resolver/subscriptions/BulkChangePayload'

@InputType()
export class MarkReplyReadInput {
  @Field(() => ID)
  replyId: string

  @Field({ nullable: true })
  isRead?: boolean
}

export async function markReplyRead(
  { em, user }: Context,
  { replyId, isRead }: MarkReplyReadInput,
  notifyRepliesChanged: Publisher<BulkChangePayload>
): Promise<Reply> {
  const reply = await em.findOneOrFail(Reply, replyId, [
    'fromUser',
    'comment.author',
    'parentComment.author',
    'post.server',
    'post.author'
  ])
  if (reply.user !== user) throw new Error('Not your reply')
  if (isRead != null) {
    reply.isRead = isRead
  }
  await em.persistAndFlush(reply)
  await notifyRepliesChanged({ ids: [replyId], type: ChangeType.Updated })
  return reply
}
