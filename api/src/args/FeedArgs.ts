import { ArgsType, Field, ID } from 'type-graphql'
import { PaginationArgs } from './PaginationArgs'

export enum Sort {
  NEW = 'new',
  TOP = 'top',
  HOT = 'hot',
  MOSTCOMMENTS = 'mostcomments'
}

export enum Time {
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  ALL = 'all'
}

export enum Filter {
  ALL = 'all',
  MYPLANETS = 'myplanets'
}

export enum Type {
  TEXT = 'text',
  LINK = 'link',
  IMAGE = 'image'
}

@ArgsType()
export class FeedArgs extends PaginationArgs {
  @Field(() => Sort, { defaultValue: Sort.HOT })
  sort: Sort = Sort.HOT

  @Field(() => Time, { defaultValue: Time.ALL })
  time: Time = Time.ALL

  @Field(() => Filter, { defaultValue: Filter.ALL })
  filter: Filter = Filter.ALL

  @Field(() => [Type], { defaultValue: [] })
  types: Type[]

  @Field(() => ID, { nullable: true })
  planetName?: string

  @Field(() => ID, { nullable: true })
  galaxyName?: string

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  search?: string
}
