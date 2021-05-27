import { Field, ID, InputType } from 'type-graphql'
import { RelationshipStatus, User } from '@/entity'
import { Context } from '@/types'
import {logger} from "@/util";

@InputType()
export class AnswerFriendRequestInput {
  @Field(() => ID)
  userId: string

  @Field()
  accept: boolean
}

export async function answerFriendRequest(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { userId, accept }: AnswerFriendRequestInput
): Promise<User> {
  logger('answerFriendRequest')
  const user = await em.findOneOrFail(User, currentUserId)
  const [myData, theirData] = await user.getFriendData(em, userId)
  if (
    !(
      myData.status === RelationshipStatus.FriendRequestIncoming &&
      theirData.status === RelationshipStatus.FriendRequestOutgoing
    )
  )
    throw new Error('Invalid relationship status')

  if (accept) {
    myData.status = RelationshipStatus.Friends
    theirData.status = RelationshipStatus.Friends
  } else {
    myData.status = RelationshipStatus.None
    theirData.status = RelationshipStatus.None
  }
  await em.persistAndFlush([myData, theirData])
  liveQueryStore.invalidate(`User:${userId}`)
  return myData.user
}
