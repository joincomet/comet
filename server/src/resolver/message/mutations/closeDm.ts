import { DmPayload } from '@/resolver/message/subscriptions/DmPayload'
import { Context } from '@/types'
import { Publisher } from 'type-graphql'
import { FriendData, User } from '@/entity'

export async function closeDm(
  { em, user }: Context,
  userId: string,
  notifyDmClosed: Publisher<DmPayload>
): Promise<boolean> {
  const friend = await em.findOneOrFail(User, userId)
  const dm = await em.findOne(FriendData, { user, friend })
  if (!dm) return true
  dm.showChat = false
  await em.persistAndFlush(dm)
  await notifyDmClosed({ userId: user.id, friendId: userId })
  return true
}
