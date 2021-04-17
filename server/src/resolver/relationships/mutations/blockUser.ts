import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Relationship, RelationshipStatus } from '@/entity'

@InputType()
export class BlockUserInput {
  @Field(() => ID)
  userId: string
}

export async function blockUser(
  { em, user, liveQueryStore }: Context,
  { userId }: BlockUserInput
): Promise<Relationship> {
  const [myData, theirData] = await user.getFriendData(em, userId)
  if (myData.status === RelationshipStatus.Blocking)
    throw new Error('Already blocking that user')
  myData.status = RelationshipStatus.Blocking
  if (theirData.status !== RelationshipStatus.Blocking)
    theirData.status = RelationshipStatus.Blocked
  await em.persistAndFlush([myData, theirData])
  liveQueryStore.invalidate(`User:${userId}`)
  return myData
}
