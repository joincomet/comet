import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Relationship, RelationshipStatus, User } from '@/entity'

@InputType()
export class UnblockUserInput {
  @Field(() => ID)
  userId: string
}

export async function unblockUser(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { userId }: UnblockUserInput
): Promise<User> {
  const user = await em.findOneOrFail(User, currentUserId)
  const [myData, theirData] = await user.getFriendData(em, userId)
  if (myData.status !== RelationshipStatus.Blocking)
    throw new Error('Not blocking that user')
  myData.status = RelationshipStatus.None
  if (theirData.status !== RelationshipStatus.Blocking)
    theirData.status = RelationshipStatus.None
  await em.persistAndFlush([myData, theirData])
  liveQueryStore.invalidate(`User:${userId}`)
  return myData.user
}
