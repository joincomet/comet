import { ArgsType, Field } from 'type-graphql'
import { Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { ServerCategory } from '@/resolver/server'

@ArgsType()
export class CreateServerArgs {
  @Field()
  @Length(2, 100)
  name: string

  @Field({ defaultValue: false })
  isPublic: boolean

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload
}
