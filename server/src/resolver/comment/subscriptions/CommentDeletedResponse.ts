import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class CommentDeletedResponse {
  @Field(() => ID)
  postId: string

  @Field(() => ID)
  commentId: string
}
