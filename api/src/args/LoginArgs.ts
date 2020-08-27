import { ArgsType, Field } from 'type-graphql'
import { Matches, Length } from 'class-validator'

@ArgsType()
export class LoginArgs {
  @Field()
  @Length(3, 15)
  @Matches(/^[a-zA-Z0-9_]+$/)
  username: string

  @Field()
  @Length(6)
  password: string
}
