import { Context } from '@/types'
import { Reply } from '@/entity'
import {logger} from "@/util";

export async function replies(
  { em, userId }: Context
): Promise<Reply[]> {
  logger('replies')
  return em.find(
    Reply,
    { user: userId },
    [
      'user',
      'comment.author',
      'comment.post.server',
      'comment.parentComment.author'
    ],
    { id: 'DESC' }
  )
}
