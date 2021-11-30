import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Message, MessageType, RelationshipStatus, User } from '@/entity'
import { ChangePayload, ChangeType } from '@/resolver/subscriptions'
import { Publisher } from 'type-graphql/dist/interfaces/Publisher'
import {logger} from "@/util";

@InputType()
export class CreateFriendRequestInput {
  @Field(() => ID)
  userId: string
}

export async function createFriendRequest(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { userId }: CreateFriendRequestInput,
  notifyMessageChanged: Publisher<ChangePayload>
): Promise<User> {
  logger('createFriendRequest')
  const currentUser = await em.findOneOrFail(User, currentUserId)
  const [myData, theirData] = await currentUser.getFriendData(em, userId)
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
  const message = em.create(Message, {
    type: MessageType.FriendRequestReceived,
    toUser: userId,
    author: currentUser
  })
  await em.persistAndFlush(message)
  await notifyMessageChanged({ id: message.id, type: ChangeType.Added })
  return myData.user
}
