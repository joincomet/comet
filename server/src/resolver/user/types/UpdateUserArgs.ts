import { ArgsType, Field } from 'type-graphql'
import { IsEmail, Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

@ArgsType()
export class UpdateUserArgs {
  @Field({ nullable: true })
  @Length(2, 32)
  name?: string

  @Field({ nullable: true })
  @IsEmail()
  email?: string

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload
}
