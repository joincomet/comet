import { Context } from '@/types'
import { Publisher } from 'type-graphql'
import { UserReplyPayload } from '@/resolver/reply/subscriptions/UserReplyPayload'
import { Reply } from '@/entity'

export async function markReplyRead(
  { em, user }: Context,
  replyId: string,
  notifyReplyRead: Publisher<UserReplyPayload>
): Promise<Reply> {
  const reply = await em.findOneOrFail(Reply, replyId)
  if (reply.toUser !== user) throw new Error('error.reply.notYours')
  reply.isRead = true
  await em.persistAndFlush(reply)
  await notifyReplyRead({ userId: user.id, replyId: reply.id })
  return reply
}
