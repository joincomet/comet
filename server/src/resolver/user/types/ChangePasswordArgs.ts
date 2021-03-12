import { ArgsType, Field } from 'type-graphql'
import { Length } from 'class-validator'

@ArgsType()
export class ChangePasswordArgs {
  @Field({ description: 'New password' })
  @Length(6)
  password: string

  @Field({ description: 'Current password for verification' })
  currentPassword: string
}
