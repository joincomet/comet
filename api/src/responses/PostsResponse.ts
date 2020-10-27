import { Field, Int, ObjectType } from 'type-graphql'
import { Post } from '@/entities/Post'

@ObjectType()
export class PostsResponse {
  @Field(() => Int)
  page: number

  @Field(() => Int)
  nextPage: number

  @Field(() => [Post])
  posts: Post[]
}
