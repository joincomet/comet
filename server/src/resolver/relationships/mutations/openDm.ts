import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Message, MessageType, Relationship, User } from '@/entity'
import {logger} from "@/util";

@InputType()
export class OpenDmInput {
  @Field(() => ID)
  userId: string
}

export async function openDm(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { userId }: OpenDmInput
): Promise<User> {
  logger('openDm')
  const owner = await em.findOneOrFail(User, currentUserId)
  const user = await em.findOneOrFail(User, userId)
  let myData = await em.findOne(Relationship, { owner, user })
  let theirData = await em.findOne(Relationship, {
    owner: user,
    user: owner
  })

  if (!myData) {
    myData = em.create(Relationship, {
      owner,
      user
    })
  }
  let initialMessage: Message
  if (!theirData) {
    theirData = em.create(Relationship, {
      owner: user,
      user: owner
    })
    initialMessage = em.create(Message, {
      type: MessageType.Initial,
      author: owner,
      toUser: user
    })
    em.persist([theirData, initialMessage])
  }
  if (myData.showChat) throw new Error('DM already open')
  myData.showChat = true
  await em.persistAndFlush(myData)
  liveQueryStore.invalidate(`User:${userId}`)
  return myData.user
}
