import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Relationship, User } from '@/entity'

@InputType()
export class OpenDmInput {
  @Field(() => ID)
  userId: string
}

export async function openDm(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { userId }: OpenDmInput
): Promise<Relationship> {
  const user = await em.findOneOrFail(User, currentUserId)
  const [myData] = await user.getFriendData(em, userId)
  if (myData.showChat) throw new Error('DM already open')
  myData.showChat = true
  await em.persistAndFlush(myData)
  liveQueryStore.invalidate(`User:${userId}`)
  return myData
}
