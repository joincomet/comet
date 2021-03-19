import { ArgsType, Field, ID } from 'type-graphql'
import { GetCommentsSort } from '@/resolver/comment'

@ArgsType()
export class GetCommentsArgs {
  @Field(() => ID, {
    nullable: true,
    description: 'Return all comments for given post ID'
  })
  postId: string

  @Field(() => GetCommentsSort, {
    description: 'Sort comments by new or top',
    defaultValue: 'TOP'
  })
  sort: GetCommentsSort = GetCommentsSort.Top
}
