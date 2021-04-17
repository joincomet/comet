import { Field, ID, InputType } from 'type-graphql'
import { Length } from 'class-validator'

@InputType()
export class GlobalBanInput {
  @Field(() => ID)
  userId: string

  @Field({ nullable: true })
  @Length(1, 1000)
  reason?: string
}
