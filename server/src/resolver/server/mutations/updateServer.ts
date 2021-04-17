import { Field, ID, InputType, Int } from 'type-graphql'
import { Length } from 'class-validator'
import { ServerCategory } from '@/entity'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

@InputType()
export class UpdateServerInput {
  @Field(() => ID)
  serverId: string

  @Field({ nullable: true })
  @Length(2, 100)
  name?: string

  @Field({ nullable: true })
  @Length(0, 500)
  description?: string

  @Field({ nullable: true })
  isPublic?: boolean

  @Field({ nullable: true })
  isFeatured?: boolean

  @Field(() => Int, { nullable: true })
  featuredPosition?: number

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload

  @Field(() => GraphQLUpload, { nullable: true })
  bannerFile?: FileUpload

  @Field(() => ID, { nullable: true })
  ownerId?: string

  @Field(() => ID, { nullable: true })
  systemMessagesChannelId?: string

  @Field({ nullable: true })
  sendWelcomeMessage: boolean
}
