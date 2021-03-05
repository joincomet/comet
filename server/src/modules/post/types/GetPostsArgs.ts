import { ArgsType, Field, ID } from 'type-graphql'
import { PaginationArgs } from '@/types/PaginationArgs'
import { GetPostsSort } from '@/modules/post/types/GetPostsSort'
import { GetPostsTime } from '@/modules/post/types/GetPostsTime'

@ArgsType()
export class GetPostsArgs extends PaginationArgs {
  @Field(() => GetPostsSort, {
    defaultValue: GetPostsSort.HOT,
    description: 'Sort by new, hot, top, most comments'
  })
  sort: GetPostsSort = GetPostsSort.HOT

  @Field(() => GetPostsTime, {
    defaultValue: GetPostsTime.ALL,
    description: 'Filter by all, hour, day, week, month, year'
  })
  time: GetPostsTime = GetPostsTime.ALL

  @Field(() => Boolean, {
    defaultValue: false,
    description: 'Show posts from only joined servers'
  })
  joinedOnly = false

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
