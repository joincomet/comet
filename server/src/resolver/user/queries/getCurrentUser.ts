import { Context } from '@/types'
import { User } from '@/entity'
import { CustomError } from '@/types/CustomError'

export async function getCurrentUser({ em, user }: Context): Promise<User> {
  if (!user) {
    return null
  }

  if (user.isBanned)
    throw new CustomError(
      'error.login.banned',
      user.banReason ? `: ${user.banReason}` : ''
    )

  user.lastLoginAt = new Date()
  await em.persistAndFlush(user)
  return user
}
