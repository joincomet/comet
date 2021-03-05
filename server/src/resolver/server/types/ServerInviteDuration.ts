import { registerEnumType } from 'type-graphql'

export enum ServerInviteDuration {
  HALF_HOUR = 1.8e6,
  ONE_HOUR = 3.6e6,
  SIX_HOURS = 2.16e7,
  TWELVE_HOURS = 4.32e7,
  DAY = 8.64e7,
  WEEK = 6.048e8,
  NEVER = -1
}

registerEnumType(ServerInviteDuration, { name: 'ServerInviteDuration' })
