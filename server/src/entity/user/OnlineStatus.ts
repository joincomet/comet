import { registerEnumType } from 'type-graphql'

export enum OnlineStatus {
  Online = 'Online',
  Away = 'Away',
  DoNotDisturb = 'DoNotDisturb',
  Offline = 'Offline'
}

registerEnumType(OnlineStatus, { name: 'OnlineStatus' })
