import { Field, Int, ObjectType } from 'type-graphql'
import { Post } from '@/entity/Post'

@ObjectType()
export class GetPostsResponse {
  @Field(() => Int)
  page: number

  @Field(() => Int, { nullable: true })
  nextPage?: number

  @Field(() => [Post])
  posts: Post[]
}
