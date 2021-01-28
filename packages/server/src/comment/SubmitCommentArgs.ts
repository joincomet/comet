import { ArgsType, Field, ID } from 'type-graphql'
import { Length, Matches } from 'class-validator'

@ArgsType()
export class SubmitCommentArgs {
  @Field()
  @Length(1, 100000, {
    message: 'Text must be between 1 and 100000 characters'
  })
  @Matches(/[^ ]+/)
  textContent: string

  @Field(() => ID)
  postId: number

  @Field(() => ID, { nullable: true })
  parentCommentId?: number
}
