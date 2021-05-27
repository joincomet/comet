import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { RelationshipStatus, User } from '@/entity'
import {logger} from "@/util";

@InputType()
export class BlockUserInput {
  @Field(() => ID)
  userId: string
}

export async function blockUser(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { userId }: BlockUserInput
): Promise<User> {
  logger('blockUser')
  const user = await em.findOneOrFail(User, currentUserId)
  const [myData, theirData] = await user.getFriendData(em, userId)
  if (myData.status === RelationshipStatus.Blocking)
    throw new Error('Already blocking that user')
  myData.status = RelationshipStatus.Blocking
  if (theirData.status !== RelationshipStatus.Blocking)
    theirData.status = RelationshipStatus.Blocked
  await em.persistAndFlush([myData, theirData])
  liveQueryStore.invalidate(`User:${userId}`)
  return myData.user
}
