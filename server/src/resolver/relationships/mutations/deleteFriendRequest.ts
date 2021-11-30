import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { RelationshipStatus, User } from '@/entity'
import {logger} from "@/util";

@InputType()
export class DeleteFriendRequestInput {
  @Field(() => ID)
  userId: string
}

export async function deleteFriendRequest(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { userId }: DeleteFriendRequestInput
): Promise<User> {
  logger('deleteFriendRequest')
  const user = await em.findOneOrFail(User, currentUserId)
  const [myData, theirData] = await user.getFriendData(em, userId)
  if (
    !(
      myData.status === RelationshipStatus.FriendRequestOutgoing &&
      theirData.status === RelationshipStatus.FriendRequestIncoming
    )
  )
    throw new Error('You have not sent a friend request to that user')
  myData.status = RelationshipStatus.None
  theirData.status = RelationshipStatus.None
  await em.persistAndFlush([myData, theirData])
  liveQueryStore.invalidate(`User:${userId}`)
  return myData.user
}
