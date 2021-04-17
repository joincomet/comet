import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class ReadFolderInput {
  @Field(() => ID)
  folderId: string
}
