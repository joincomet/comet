import { registerEnumType } from 'type-graphql'

export enum StatusDuration {
  HALF_HOUR = 1.8e6,
  ONE_HOUR = 3.6e6,
  FOUR_HOURS = 1.44e7,
  DAY = 8.64e7,
  NEVER = -1
}

registerEnumType(StatusDuration, { name: 'StatusDuration' })
