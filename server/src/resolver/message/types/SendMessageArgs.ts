import { ArgsType, Field, ID } from 'type-graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

@ArgsType()
export class SendMessageArgs {
  @Field()
  text: string

  @Field(() => GraphQLUpload, { nullable: true })
  file?: FileUpload

  @Field(() => ID, { nullable: true })
  channelId?: string

  @Field(() => ID, { nullable: true })
  groupId?: string

  @Field(() => ID, { nullable: true })
  userId?: string
}
