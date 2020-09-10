import { ArgsType, Field } from 'type-graphql'
import {IsEmail, IsOptional, Length, Matches, ValidateIf} from 'class-validator'
import { LoginArgs } from '@/args/LoginArgs'

@ArgsType()
export class SignUpArgs {
  @Field()
  @Length(3, 15)
  @Matches(/^[a-zA-Z0-9_]+$/)
  username: string

  @Field()
  @Length(6)
  password: string

  @Field({ nullable: true })
  @ValidateIf((e) => e.email !== '')
  @IsOptional()
  @IsEmail()
  email?: string
}
