import { Field, ID, ObjectType } from 'type-graphql'
import { Post } from '@/entity'

@ObjectType()
export class PostCreatedResponse {
  @Field(() => Post)
  post: Post

  @Field(() => ID)
  serverId: string
}
