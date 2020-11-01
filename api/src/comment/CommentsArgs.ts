import { ArgsType, Field, ID } from 'type-graphql'
import { CommentSort } from '@/comment/CommentSort'

@ArgsType()
export class CommentsArgs {
  @Field(() => ID, {
    nullable: true,
    description: 'If provided, return all comments for given post ID'
  })
  postId?: number

  @Field(() => ID, {
    nullable: true,
    description:
      'If provided, return thread of comments, starting at parent of given ID'
  })
  commentId?: number

  @Field(() => String, {
    nullable: true,
    description:
      'If provided, return all comments by given username, and their parent comments'
  })
  username?: string

  @Field(() => CommentSort, {
    defaultValue: CommentSort.TOP,
    description: 'Sort by new or top'
  })
  sort: CommentSort = CommentSort.TOP
}
