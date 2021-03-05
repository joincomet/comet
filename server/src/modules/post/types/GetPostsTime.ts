import { registerEnumType } from 'type-graphql'

export enum GetPostsTime {
  HOUR,
  DAY,
  WEEK,
  MONTH,
  YEAR,
  ALL
}

registerEnumType(GetPostsTime, {
  name: 'GetPostsTime'
})
