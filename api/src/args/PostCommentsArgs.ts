import { ArgsType, Field, ID } from 'type-graphql'
import { PostSort } from '@/types/PostSort'

@ArgsType()
export class PostCommentsArgs {
  @Field(() => ID)
  postId: number

  @Field(() => PostSort, { defaultValue: PostSort.TOP })
  sort: PostSort = PostSort.TOP
}
