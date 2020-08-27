import { ArgsType, Field } from 'type-graphql'
import { PostType } from '../entities/Post'
import { Length, Matches, IsOptional } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

@ArgsType()
export class SubmitPostArgs {
  @Field()
  @Length(1, 300)
  title: string

  @Field(() => PostType)
  type: PostType

  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 5000)
  link?: string

  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 100000)
  textContent?: string

  @Field()
  @Matches(/^[a-zA-Z0-9_]+$/)
  @Length(3, 21)
  planet: string

  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload
}
