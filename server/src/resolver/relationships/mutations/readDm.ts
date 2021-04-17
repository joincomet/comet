import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Relationship } from '@/entity'

@InputType()
export class ReadDmInput {
  @Field(() => ID)
  userId: string
}

export async function readDm(
  { em, user, liveQueryStore }: Context,
  { userId }: ReadDmInput
): Promise<Relationship> {
  const [myData] = await user.getFriendData(em, userId)
  myData.unreadCount = 0
  myData.lastViewAt = new Date()
  await em.persistAndFlush(myData)
  liveQueryStore.invalidate(`User:${userId}`)
  return myData
}
