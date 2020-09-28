import { ArgsType, Field, ID } from 'type-graphql'
import { PaginationArgs } from '@/args/PaginationArgs'
import { PostSort } from '@/types/PostSort'
import { TimeFilter } from '@/types/TimeFilter'
import { Feed } from '@/types/Feed'

@ArgsType()
export class FeedArgs extends PaginationArgs {
  @Field(() => PostSort, { defaultValue: PostSort.HOT })
  sort: PostSort = PostSort.HOT

  @Field(() => TimeFilter, { defaultValue: TimeFilter.ALL })
  time: TimeFilter = TimeFilter.ALL

  @Field(() => Feed, { defaultValue: Feed.ALL })
  feed: Feed = Feed.ALL

  @Field(() => ID, { nullable: true })
  community?: string

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  search?: string
}
