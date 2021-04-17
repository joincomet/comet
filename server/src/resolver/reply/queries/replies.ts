import { Context } from '@/types'
import { Reply } from '@/entity'

export async function replies({ em, user }: Context): Promise<Reply[]> {
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
    { createdAt: 'DESC' }
  )
}
