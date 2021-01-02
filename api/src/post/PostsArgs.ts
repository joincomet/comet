import { ArgsType, Field, ID } from 'type-graphql'
import { PaginationArgs } from '@/PaginationArgs'
import { PostSort } from '@/post/PostSort'
import { TimeFilter } from '@/TimeFilter'
import { Galaxy } from '@/Galaxy'

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

  @Field(() => Boolean, {
    defaultValue: false,
    description: 'Show posts from only joined planets'
  })
  joinedOnly: boolean = false

  @Field({
    nullable: true,
    description: 'If provided, only posts from given planet will be returned'
  })
  planet?: string

  @Field(() => Galaxy, {
    nullable: true,
    description: 'If provided, only posts from given galaxy will be returned'
  })
  galaxy?: Galaxy

  @Field(() => ID, {
    nullable: true,
    description: 'If provided, only posts from given folder ID will be returned'
  })
  folderId?: number

  @Field({
    nullable: true,
    description: 'If provided, only posts from given username will be returned'
  })
  username?: string

  @Field({
    nullable: true,
    description:
      'If provided, only posts matching given search term will be returned'
  })
  q?: string
}
