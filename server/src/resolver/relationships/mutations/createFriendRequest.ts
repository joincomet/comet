import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Relationship, RelationshipStatus } from '@/entity'

@InputType()
export class CreateFriendRequestInput {
  @Field(() => ID)
  userId: string
}

export async function createFriendRequest(
  { em, user, liveQueryStore }: Context,
  { userId }: CreateFriendRequestInput
): Promise<Relationship> {
  const [myData, theirData] = await user.getFriendData(em, userId)
  if (
    !(
      myData.status === RelationshipStatus.None &&
      theirData.status === RelationshipStatus.None
    )
  )
    throw new Error('Invalid relationship status')
  myData.status = RelationshipStatus.FriendRequestOutgoing
  theirData.status = RelationshipStatus.FriendRequestIncoming
  await em.persistAndFlush([myData, theirData])
  liveQueryStore.invalidate(`User:${userId}`)
  return myData
}
