import { Context } from '@/types'
import { Publisher } from 'type-graphql'
import { Reply } from '@/entity'
import { getReplies } from '@/resolver/reply/queries/getReplies'

export async function markAllRepliesRead(
  { em, user }: Context,
  notifyAllRepliesRead: Publisher<{ userId: string }>
): Promise<Reply[]> {
  await em
    .createQueryBuilder(Reply)
    .update({ isRead: true })
    .where({ toUser: user })
    .execute()
  await notifyAllRepliesRead({ userId: user.id })
  return getReplies({ em, user })
}
