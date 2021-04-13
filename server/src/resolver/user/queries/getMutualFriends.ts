import { Relationship, RelationshipStatus, User } from '@/entity'
import { Context } from '@/types'

export async function getMutualFriends(
  { em, user }: Context,
  userId: string
): Promise<User[]> {
  const them = await em.findOneOrFail(User, userId)
  const myFriends = (
    await em.find(Relationship, { user, status: RelationshipStatus.Friends }, [
      'friend'
    ])
  ).map(f => f.user)
  const theirFriends = (
    await em.find(
      Relationship,
      { user: them, status: RelationshipStatus.Friends },
      ['friend']
    )
  ).map(f => f.user.id)
  return myFriends.filter(f => theirFriends.includes(f.id))
}
