import { ArgsType, Field } from 'type-graphql'
import { IsEmail, Length } from 'class-validator'

@ArgsType()
export class CreateUserArgs {
  @Field()
  @Length(2, 32)
  name: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @Length(6)
  password: string
}
