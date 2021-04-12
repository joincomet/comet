import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class PostDeletedResponse {
  @Field(() => ID)
  postId: string

  @Field(() => ID)
  serverId: string
}
