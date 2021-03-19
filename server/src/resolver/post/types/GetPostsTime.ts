import { registerEnumType } from 'type-graphql'

export enum GetPostsTime {
  Hour = 'HOUR',
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  Year = 'YEAR',
  All = 'ALL'
}

registerEnumType(GetPostsTime, {
  name: 'GetPostsTime'
})
