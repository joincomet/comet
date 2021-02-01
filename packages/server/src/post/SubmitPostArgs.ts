import { ArgsType, Field, ID } from 'type-graphql'
import { ArrayMaxSize, IsOptional, Length, Matches } from 'class-validator'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

@ArgsType()
export class SubmitPostArgs {
  @Field({ nullable: true })
  @Length(1, 300, { message: 'Title must be no longer than 300 characters.' })
  title: string

  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 5000, { message: 'URL must be no longer than 5000 characters.' })
  linkUrl?: string

  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 100000, {
    message: 'Text must be between 1 and 100000 characters'
  })
  textContent?: string

  @Field(() => ID)
  planetId: bigint

  @Field(() => [GraphQLUpload], { nullable: true })
  @IsOptional()
  @ArrayMaxSize(10, { message: 'Cannot upload more than 10 images' })
  images?: FileUpload[]
}
