import { ArgsType, Field } from 'type-graphql'
import {
  IsEmail,
  IsOptional,
  Length,
  Matches,
  ValidateIf
} from 'class-validator'

@ArgsType()
export class SignUpArgs {
  @Field()
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters.' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only have letters, numbers, and underscores.'
  })
  username: string

  @Field()
  @Length(6, undefined, { message: 'Password must be at least 6 characters.' })
  password: string

  @Field({ nullable: true })
  @ValidateIf(e => e.email !== '')
  @IsOptional()
  @IsEmail(undefined, { message: 'Invalid email' })
  email?: string
}
