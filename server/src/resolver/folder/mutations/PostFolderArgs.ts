import { ArgsType, Field, ID } from 'type-graphql'

@ArgsType()
export class PostFolderArgs {
  @Field(() => ID)
  folderId: string

  @Field(() => ID)
  postId: string
}
