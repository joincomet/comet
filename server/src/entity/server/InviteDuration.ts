import { registerEnumType } from 'type-graphql'

export enum InviteDuration {
  HalfHour = 1.8e6,
  OneHour = 3.6e6,
  SixHours = 2.16e7,
  TwelveHours = 4.32e7,
  Day = 8.64e7,
  Week = 6.048e8,
  Never = -1
}

registerEnumType(InviteDuration, { name: 'InviteDuration' })
