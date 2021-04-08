import { registerEnumType } from 'type-graphql'

export enum GetPostsTime {
  Hour = 'Hour',
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
  All = 'All'
}

registerEnumType(GetPostsTime, {
  name: 'GetPostsTime'
})
