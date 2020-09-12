import { ArgsType, Field } from 'type-graphql'
import { PaginationArgs } from '@/args/PaginationArgs'
import { Length } from 'class-validator'
import { Time } from '@/args/FeedArgs'

export enum CommentSort {
  NEW = 'new',
  TOP = 'top'
}

@ArgsType()
export class UserCommentsArgs extends PaginationArgs {
  @Field()
  username: string

  @Field(() => CommentSort, { defaultValue: CommentSort.NEW })
  sort: CommentSort = CommentSort.NEW

  @Field(() => Time, { defaultValue: Time.ALL })
  time: Time = Time.ALL
}
