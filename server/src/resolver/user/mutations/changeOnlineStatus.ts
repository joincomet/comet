import { Field, InputType } from 'type-graphql'
import { OnlineStatus, User } from '@/entity'
import { Context } from '@/types'

@InputType()
export class ChangeOnlineStatusInput {
  @Field(() => OnlineStatus)
  onlineStatus: OnlineStatus
}

export async function changeOnlineStatus(
  { em, user, liveQueryStore }: Context,
  { onlineStatus }: ChangeOnlineStatusInput
): Promise<User> {
  user.onlineStatus = onlineStatus
  await em.persistAndFlush(user)
  liveQueryStore.invalidate(`User:${user.id}`)
  return user
}
