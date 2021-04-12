import { Context } from '@/types'
import { User } from '@/entity'

export async function getUser({ em }: Context, userId: string): Promise<User> {
  return em.findOneOrFail(User, userId)
}
