import { ArgsType, Field, ID } from 'type-graphql'
import { PaginationArgs } from '@/types'
import { GetPostsSort, GetPostsTime } from '@/resolver/post'

@ArgsType()
export class GetPostsArgs extends PaginationArgs {
  @Field(() => GetPostsSort, {
    defaultValue: 'Hot',
    description: 'Sort by new, hot, top, most comments'
  })
  sort: GetPostsSort = GetPostsSort.Hot

  @Field(() => GetPostsTime, {
    defaultValue: 'All',
    description: 'Filter by all, hour, day, week, month, year'
  })
  time: GetPostsTime = GetPostsTime.All

  @Field(() => ID, {
    nullable: true,
    description: 'If provided, only posts from given server ID will be returned'
  })
  serverId?: string

  @Field(() => ID, {
    nullable: true,
    description: 'If provided, only posts from given folder ID will be returned'
  })
  folderId?: string

  @Field({
    nullable: true,
    description:
      'If provided, only posts matching given search term will be returned'
  })
  search?: string
}
