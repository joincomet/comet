import { Context } from '@/types'
import { User } from '@/entity'

export async function unbanUserGlobal(
  { em }: Context,
  userId: string
): Promise<boolean> {
  await em
    .createQueryBuilder(User)
    .update({
      isBanned: false,
      banReason: null
    })
    .where({ id: userId })
    .execute()
  return true
}
