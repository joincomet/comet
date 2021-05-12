import { Context } from '@/types'
import { Reply } from '@/entity'

export async function replies({ em, userId }: Context): Promise<Reply[]> {
  return em.find(
    Reply,
    { user: userId },
    [
      'user',
      'comment.author.user',
      'comment.author.roles',
      'comment.post.server',
      'comment.parentComment.author.user',
      'comment.parentComment.author.roles'
    ],
    { createdAt: 'DESC' }
  )
}
