import { FriendData, User } from '@/entity'
import { Context } from '@/types'
import { FriendStatus } from '@/resolver/user'

export async function getMutualFriends(
  { em, user }: Context,
  userId: string
): Promise<User[]> {
  const them = await em.findOneOrFail(User, userId)
  const myFriends = (
    await em.find(FriendData, { user, status: FriendStatus.Friends }, [
      'friend'
    ])
  ).map(f => f.friend)
  const theirFriends = (
    await em.find(FriendData, { user: them, status: FriendStatus.Friends }, [
      'friend'
    ])
  ).map(f => f.friend.id)
  return myFriends.filter(f => theirFriends.includes(f.id))
}
