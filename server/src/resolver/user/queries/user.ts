import { Context } from '@/types'
import { User } from '@/entity'

export async function user(
  { em, userId: currentUserId }: Context,
  userId: string
): Promise<User> {
  // em = em.fork()
  if (!userId || userId === currentUserId) {
    // Current user
    if (!currentUserId) return null
    return em.findOne(User, currentUserId)
  } else {
    // Other user
    if (!currentUserId) throw new Error('Must be authorized')
    return em.findOneOrFail(User, userId)
  }
}
