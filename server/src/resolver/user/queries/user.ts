import { Context } from '@/types'
import { User } from '@/entity'

export async function user(
  { em, userId: currentUserId }: Context,
  userId: string
): Promise<User> {
  if (!userId || userId === currentUserId) {
    // Current user
    if (!currentUserId) return null
    return em.findOne(User, currentUserId, { cache: false })
  } else {
    // Other user
    if (!currentUserId) throw new Error('Must be authorized')
    return em.findOneOrFail(User, userId, { cache: false })
  }
}
