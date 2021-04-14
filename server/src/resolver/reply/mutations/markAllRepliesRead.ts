import { Context } from '@/types'
import { Publisher } from 'type-graphql'
import { Reply } from '@/entity'
import { getReplies } from '@/resolver/reply/queries/getReplies'

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
