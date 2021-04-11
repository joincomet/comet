import { Field, ID, ObjectType } from 'type-graphql'
import { Comment } from '@/entity'

@ObjectType()
export class PostCommentResponse {
  @Field(() => ID)
  postId: string

  @Field(() => Comment)
  comment: Comment
}
