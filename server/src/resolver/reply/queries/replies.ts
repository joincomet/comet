import { Context } from '@/types'
import { Reply } from '@/entity'

export async function replies({ em, user }: Context): Promise<Reply[]> {
  return em.find(
    Reply,
    { user },
    [
      'user',
      'comment.author.user',
      'comment.author.roles',
      'comment.post',
      'comment.parentComment.author.user',
      'comment.parentComment.author.roles'
    ],
    { createdAt: 'DESC' }
  )
}
