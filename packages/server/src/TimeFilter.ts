import { registerEnumType } from 'type-graphql'

export enum TimeFilter {
  HOUR,
  DAY,
  WEEK,
  MONTH,
  YEAR,
  ALL
}

registerEnumType(TimeFilter, {
  name: 'TimeFilter'
})
