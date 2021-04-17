import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class ReadPostInput {
  @Field(() => ID)
  postId: string
}
