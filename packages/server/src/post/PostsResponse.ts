import { Field, Int, ObjectType } from 'type-graphql'
import { Post } from '@/post/Post.entity'

@ObjectType()
export class PostsResponse {
  @Field(() => Int)
  page: number

  @Field(() => Int, { nullable: true })
  nextPage?: number

  @Field(() => [Post])
  posts: Post[]
}
