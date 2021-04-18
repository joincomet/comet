import { Field, ID, InputType } from 'type-graphql'
import { Context, NotificationSetting } from '@/types'
import { ServerUser, ServerUserStatus } from '@/entity'

@InputType()
export class ChangeNotificationSettingInput {
  @Field(() => ID)
  serverId: string

  @Field(() => NotificationSetting)
  notificationSetting: NotificationSetting
}

export async function changeNotificationSetting(
  { em, user, liveQueryStore }: Context,
  { serverId, notificationSetting }: ChangeNotificationSettingInput
): Promise<ServerUser> {
  const serverUser = await em.findOneOrFail(ServerUser, {
    user,
    server: serverId,
    status: ServerUserStatus.Joined
  })
  serverUser.notificationSetting = notificationSetting
  await em.persistAndFlush(serverUser)
  liveQueryStore.invalidate(`Server:${serverId}`)
  return serverUser
}
