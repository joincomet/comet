import { Context } from '@/types'
import { User } from '@/entity'

export async function deleteAccount({ em, userId }: Context): Promise<boolean> {
  const user = await em.findOneOrFail(User, userId)
  user.isDeleted = true
  await em.persistAndFlush(user)
  return true
}
