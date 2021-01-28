import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class LoginArgs {
  @Field()
  username: string

  @Field()
  password: string
}
