import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Relationship, RelationshipStatus } from '@/entity'

@InputType()
export class DeleteFriendRequestInput {
  @Field(() => ID)
  userId: string
}

export async function deleteFriendRequest(
  { em, user, liveQueryStore }: Context,
  { userId }: DeleteFriendRequestInput
): Promise<Relationship> {
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
  return myData
}
