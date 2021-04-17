import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Relationship, RelationshipStatus } from '@/entity'

@InputType()
export class UnblockUserInput {
  @Field(() => ID)
  userId: string
}

export async function unblockUser(
  { em, user, liveQueryStore }: Context,
  { userId }: UnblockUserInput
): Promise<Relationship> {
  const [myData, theirData] = await user.getFriendData(em, userId)
  if (myData.status !== RelationshipStatus.Blocking)
    throw new Error('Not blocking that user')
  myData.status = RelationshipStatus.None
  if (theirData.status !== RelationshipStatus.Blocking)
    theirData.status = RelationshipStatus.None
  await em.persistAndFlush([myData, theirData])
  liveQueryStore.invalidate(`User:${userId}`)
  return myData
}
