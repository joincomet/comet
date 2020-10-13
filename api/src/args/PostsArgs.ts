import { ArgsType, Field, ID } from 'type-graphql'
import { PaginationArgs } from '@/args/PaginationArgs'
import { PostSort } from '@/types/posts/PostSort'
import { TimeFilter } from '@/types/posts/TimeFilter'
import { Feed } from '@/types/posts/Feed'

@ArgsType()
export class PostsArgs extends PaginationArgs {
  @Field(() => PostSort, {
    defaultValue: PostSort.HOT,
    description: 'Sort by new, hot, top, most comments'
  })
  sort: PostSort = PostSort.HOT

  @Field(() => TimeFilter, {
    defaultValue: TimeFilter.ALL,
    description: 'Filter by all, hour, day, week, month, year'
  })
  time: TimeFilter = TimeFilter.ALL

  @Field(() => Feed, {
    defaultValue: Feed.ALL,
    description: 'Show posts from everywhere, or only joined planets/users'
  })
  feed: Feed = Feed.ALL

  @Field(() => [String], {
    nullable: true,
    description: 'If provided, only posts from given planets will be returned'
  })
  planets?: string[]

  @Field(() => [String], {
    nullable: true,
    description: 'If provided, only posts from given tags will be returned'
  })
  tags?: string[]

  @Field(() => [String], {
    nullable: true,
    description: 'If provided, only posts from given usernames will be returned'
  })
  usernames?: string[]

  @Field({
    nullable: true,
    description:
      'If provided, only posts matching given search term will be returned'
  })
  search?: string
}
