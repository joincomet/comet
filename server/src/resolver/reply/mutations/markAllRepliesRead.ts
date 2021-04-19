import { Context } from '@/types'
import { Reply } from '@/entity'

export async function markAllRepliesRead({
  em,
  userId,
  liveQueryStore
}: Context): Promise<boolean> {
  await em
    .createQueryBuilder(Reply)
    .update({ isRead: true })
    .where({ user: userId })
    .execute()
  liveQueryStore.invalidate(`Query.replies(userId:"${userId}")`)
  return true
}
