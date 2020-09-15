import { ArgsType, Field } from 'type-graphql'
import { PostType } from '@/entities/Post'
import { IsOptional, Length, Matches } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

@ArgsType()
export class SubmitPostArgs {
  @Field()
  @Length(1, 300, { message: "Title must be no longer than 300 characters."})
  @Matches(/[^ ]+/)
  title: string

  @Field(() => PostType)
  type: PostType

  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 5000, { message: "URL must be no longer than 5000 characters."})
  @Matches(/[^ ]+/)
  link?: string

  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 100000, { message: "Text must be between 1 and 100000 characters"})
  @Matches(/[^ ]+/)
  textContent?: string

  @Field()
  @Matches(/^[a-zA-Z0-9_]+$/, {message: "Planet name can only have letters, numbers, and underscores."})
  @Length(3, 21, { message: "Planet name must be between 3 and 21 characters."})
  planet: string

  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload
}
