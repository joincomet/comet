import { ArgsType, Field, ID } from 'type-graphql'
import { PaginationArgs } from '@/args/PaginationArgs'
import { PostSort } from '@/types/feed/PostSort'
import { TimeFilter } from '@/types/feed/TimeFilter'
import { Feed } from '@/types/feed/Feed'

@ArgsType()
export class FeedArgs extends PaginationArgs {
  @Field(() => PostSort, { defaultValue: PostSort.HOT })
  sort: PostSort = PostSort.HOT

  @Field(() => TimeFilter, { defaultValue: TimeFilter.ALL })
  time: TimeFilter = TimeFilter.ALL

  @Field(() => Feed, { defaultValue: Feed.ALL })
  feed: Feed = Feed.ALL

  @Field(() => [String], { nullable: true })
  communities?: string[]

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field(() => [String], { nullable: true })
  usernames?: string[]

  @Field({ nullable: true })
  search?: string
}
