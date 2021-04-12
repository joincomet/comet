import { FriendStatusChangedPayload } from '@/resolver/user/subscriptions'
import { ArgsType, Field, ID, Publisher } from 'type-graphql'
import { Context } from '@/types'
import { FriendData, User } from '@/entity'
import { FriendStatus } from '@/resolver/user'

@ArgsType()
export class ChangeFriendStatusArgs {
  @Field(() => ID)
  userId: string

  @Field(() => FriendStatus)
  status: FriendStatus
}

export async function changeFriendStatus(
  { em, user }: Context,
  { userId, status }: ChangeFriendStatusArgs,
  notifyFriendStatusChanged: Publisher<FriendStatusChangedPayload>
): Promise<User> {
  if (
    status === FriendStatus.Blocked ||
    status === FriendStatus.FriendRequestIncoming ||
    status === FriendStatus.Friends
  ) {
    throw new Error('Must choose None, FriendRequestOutgoing, or Blocking')
  }

  const friend = await em.findOneOrFail(User, userId)

  let myData = await em.findOne(FriendData, { user, friend })
  if (!myData) myData = em.create(FriendData, { user, friend })

  let theirData = await em.findOne(FriendData, {
    user: friend,
    friend: user
  })
  if (!theirData)
    theirData = em.create(FriendData, { user: friend, friend: user })

  let theirStatus
  let myStatus

  if (status === FriendStatus.FriendRequestOutgoing) {
    if (theirData.status === FriendStatus.Blocking)
      throw new Error('This user is blocking you')
    if (theirData.status === FriendStatus.Friends)
      throw new Error('You are already friends with this user')
    myStatus = status
    theirStatus = FriendStatus.FriendRequestIncoming
  } else if (status === FriendStatus.Blocking) {
    if (myData.status === FriendStatus.Blocking)
      throw new Error('You are already blocking this user')
    myStatus = status
    if (theirData.status !== FriendStatus.Blocking)
      theirData.status = FriendStatus.Blocked
  } else if (status === FriendStatus.None) {
    myStatus = status
    if (theirData.status !== FriendStatus.Blocking) theirData.status = status
  }

  myData.status = myStatus
  theirData.status = theirStatus

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
