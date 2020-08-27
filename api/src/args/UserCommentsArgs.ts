import { ArgsType, Field } from 'type-graphql'
import { PaginationArgs } from './PaginationArgs'
import { Length } from 'class-validator'
import { Time } from './FeedArgs'

export enum CommentSort {
  NEW = 'new',
  TOP = 'top'
}

@ArgsType()
export class UserCommentsArgs extends PaginationArgs {
  @Field()
  @Length(3, 20)
  username: string

  @Field(() => CommentSort, { defaultValue: CommentSort.NEW })
  sort: CommentSort = CommentSort.NEW

  @Field(() => Time, { defaultValue: Time.ALL })
  time: Time = Time.ALL
}
