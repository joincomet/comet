import { Field, ObjectType } from 'type-graphql'
import { Post } from '@/entity'

@ObjectType()
export class GetPostsResponse {
  @Field()
  hasMore: boolean

  @Field(() => [Post])
  posts: Post[]
}
