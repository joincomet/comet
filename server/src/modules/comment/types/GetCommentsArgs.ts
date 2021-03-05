import { ArgsType, Field, ID } from 'type-graphql'
import { GetCommentsSort } from '@/modules/comment/types/GetCommentsSort'

@ArgsType()
export class GetCommentsArgs {
  @Field(() => ID, {
    nullable: true,
    description: 'Return all comments for given post ID'
  })
  postId: string

  @Field(() => GetCommentsSort, {
    nullable: true,
    description: 'Sort comments by new or top',
    defaultValue: GetCommentsSort.TOP
  })
  sort?: GetCommentsSort
}
