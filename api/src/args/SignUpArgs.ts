import { ArgsType, Field } from 'type-graphql'
import { IsEmail, IsOptional, ValidateIf } from 'class-validator'
import { LoginArgs } from './LoginArgs'

@ArgsType()
export class SignUpArgs extends LoginArgs {
  @Field({ nullable: true })
  @ValidateIf((e) => e.email !== '')
  @IsOptional()
  @IsEmail()
  email?: string
}
