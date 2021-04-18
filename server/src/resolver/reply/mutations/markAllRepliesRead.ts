import { Context } from '@/types'
import { Reply } from '@/entity'

export async function markAllRepliesRead({
  em,
  user,
  liveQueryStore
}: Context): Promise<boolean> {
  await em
    .createQueryBuilder(Reply)
    .update({ isRead: true })
    .where({ user })
    .execute()
  liveQueryStore.invalidate(`Query.replies(userId:"${user.id}")`)
  return true
}
