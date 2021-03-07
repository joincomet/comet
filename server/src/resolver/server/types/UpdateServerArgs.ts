import { ArgsType, Field, ID } from 'type-graphql'
import { Length } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { ServerCategory } from '@/resolver/server'

@ArgsType()
export class UpdateServerArgs {
  @Field(() => ID)
  serverId: string

  @Field({ nullable: true })
  @Length(2, 100)
  name?: string

  @Field({ nullable: true })
  @Length(0, 500)
  description?: string

  @Field({ nullable: true })
  searchable?: boolean

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload

  @Field(() => GraphQLUpload, { nullable: true })
  bannerFile?: FileUpload
}
