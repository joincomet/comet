import { ArgsType, Field } from 'type-graphql'
import { PaginationArgs } from '@/args/PaginationArgs'
import { TimeFilter } from '@/types/TimeFilter'
import { CommentSort } from '@/types/CommentSort'

@ArgsType()
export class UserCommentsArgs extends PaginationArgs {
  @Field()
  username: string

  @Field(() => CommentSort, { defaultValue: CommentSort.NEW })
  sort: CommentSort = CommentSort.NEW

  @Field(() => TimeFilter, { defaultValue: TimeFilter.ALL })
  time: TimeFilter = TimeFilter.ALL
}
