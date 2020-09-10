import { ArgsType, Field } from 'type-graphql'
import { Length, Matches } from 'class-validator'

@ArgsType()
export class LoginArgs {
  @Field()
  username: string

  @Field()
  password: string
}
