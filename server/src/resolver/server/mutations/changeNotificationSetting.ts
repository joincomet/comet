import { Field, ID, InputType } from 'type-graphql'
import { Context, NotificationSetting } from '@/types'
import { ServerUser, ServerUserStatus, User } from '@/entity'

@InputType()
export class ChangeNotificationSettingInput {
  @Field(() => ID)
  serverId: string

  @Field(() => NotificationSetting)
  notificationSetting: NotificationSetting
}

export async function changeNotificationSetting(
  { em, userId, liveQueryStore }: Context,
  { serverId, notificationSetting }: ChangeNotificationSettingInput
): Promise<ServerUser> {
  const serverUser = await em.findOneOrFail(ServerUser, {
    user: userId,
    server: serverId,
    status: ServerUserStatus.Joined
  })
  serverUser.notificationSetting = notificationSetting
  await em.persistAndFlush(serverUser)
  liveQueryStore.invalidate(`Server:${serverId}`)
  return serverUser
}
