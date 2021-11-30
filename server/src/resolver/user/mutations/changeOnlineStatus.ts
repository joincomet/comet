import { Field, InputType } from 'type-graphql'
import { OnlineStatus, User } from '@/entity'
import { Context } from '@/types'
import {logger} from "@/util";

@InputType()
export class ChangeOnlineStatusInput {
  @Field(() => OnlineStatus)
  onlineStatus: OnlineStatus
}

export async function changeOnlineStatus(
  { em, userId, liveQueryStore }: Context,
  { onlineStatus }: ChangeOnlineStatusInput
): Promise<User> {
  logger('changeOnlineStatus')
  const user = await em.findOneOrFail(User, userId)
  user.onlineStatus = onlineStatus
  user.lastLoginAt = new Date()
  await em.persistAndFlush(user)
  // liveQueryStore.invalidate(`User:${user.id}`)
  return user
}
