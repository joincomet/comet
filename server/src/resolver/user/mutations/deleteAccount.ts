import { Context } from '@/types'

export async function deleteAccount({ em, user }: Context): Promise<boolean> {
  user.isDeleted = true
  await em.persistAndFlush(user)
  return true
}
