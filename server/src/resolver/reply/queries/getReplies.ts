import { Context } from '@/types'
import { Reply } from '@/entity'
import { QueryOrder } from '@mikro-orm/core'

export async function getReplies({ em, user }: Context): Promise<Reply[]> {
  return em.find(
    Reply,
    { toUser: user },
    [
      'fromUser',
      'comment.author',
      'parentComment.author',
      'post.server',
      'post.author'
    ],
    { createdAt: QueryOrder.DESC }
  )
}
