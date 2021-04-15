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
    .where({ toUser: user })
    .execute()
  liveQueryStore.invalidate(`Query.getReplies(id:"${user.id}")`)
  return true
}
