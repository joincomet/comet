import { FriendStatusChangedPayload } from '@/resolver/user/subscriptions'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { Relationship, RelationshipStatus, User } from '@/entity'

@ArgsType()
export class ChangeFriendStatusArgs {
  @Field(() => ID)
  userId: string

  @Field(() => RelationshipStatus)
  status: RelationshipStatus
}

export async function changeFriendStatus(
  { em, user }: Context,
  { userId, status }: ChangeFriendStatusArgs,
  notifyFriendStatusChanged: Publisher<FriendStatusChangedPayload>
): Promise<User> {
  if (
    status === RelationshipStatus.Blocked ||
    status === RelationshipStatus.FriendRequestIncoming ||
    status === RelationshipStatus.Friends
  ) {
    throw new Error('Must choose None, FriendRequestOutgoing, or Blocking')
  }

  const friend = await em.findOneOrFail(User, userId)

  let myData = await em.findOne(Relationship, { owner: user, user: friend })
  if (!myData) myData = em.create(Relationship, { owner: user, user: friend })

  let theirData = await em.findOne(Relationship, {
    owner: friend,
    user
  })
  if (!theirData)
    theirData = em.create(Relationship, { owner: friend, user: user })

  let theirStatus
  let myStatus

  if (status === RelationshipStatus.FriendRequestOutgoing) {
    if (theirData.status === RelationshipStatus.Blocking)
      throw new Error('This user is blocking you')
    if (theirData.status === RelationshipStatus.Friends)
      throw new Error('You are already friends with this user')
    myStatus = status
    theirStatus = RelationshipStatus.FriendRequestIncoming
  } else if (status === RelationshipStatus.Blocking) {
    if (myData.status === RelationshipStatus.Blocking)
      throw new Error('You are already blocking this user')
    myStatus = status
    if (theirData.status !== RelationshipStatus.Blocking)
      theirData.status = RelationshipStatus.Blocked
  } else if (status === RelationshipStatus.None) {
    myStatus = status
    if (theirData.status !== RelationshipStatus.Blocking)
      theirData.status = status
  }

  myData.status = myStatus
  theirData.status = theirStatus
  const updatedAt = new Date()
  myData.updatedAt = updatedAt
  theirData.updatedAt = updatedAt

  await em.persistAndFlush([myData, theirData])

  await notifyFriendStatusChanged({
    userId: user.id,
    friendId: friend.id,
    status: myData.status
  })
  await notifyFriendStatusChanged({
    userId: friend.id,
    friendId: user.id,
    status: theirData.status
  })

  return friend
}
