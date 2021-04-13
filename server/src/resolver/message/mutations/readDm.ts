import { Context } from '@/types'
import { DmPayload } from '@/resolver/message/subscriptions/DmPayload'
import { Publisher } from 'type-graphql'
import { User } from '@/entity'

export async function readDm(
  { em, user }: Context,
  userId: string,
  notifyDmRead: Publisher<DmPayload>
): Promise<User> {
  const [myData] = await user.getFriendData(em, userId)
  myData.lastViewAt = new Date()
  myData.unreadCount = 0
  await em.persistAndFlush(myData)
  const them = myData.user
  them.unreadCount = 0
  await notifyDmRead({ userId: user.id, friendId: userId })
  return them
}
