import { Field, ID, InputType } from 'type-graphql'
import { NotificationSetting } from '@/types'

@InputType()
export class ChangeNotificationSettingInput {
  @Field(() => ID)
  serverId: string

  @Field(() => NotificationSetting)
  notificationSetting: NotificationSetting
}
