import { registerEnumType } from 'type-graphql'

export enum UserAvailability {
  ONLINE,
  AWAY,
  DO_NOT_DISTURB,
  OFFLINE
}

registerEnumType(UserAvailability, { name: 'UserAvailability' })
