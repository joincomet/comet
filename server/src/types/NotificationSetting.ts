import { registerEnumType } from 'type-graphql'

export enum NotificationSetting {
  All = 'All',
  Mentions = 'Mentions',
  None = 'None'
}

registerEnumType(NotificationSetting, { name: 'NotificationSetting' })
