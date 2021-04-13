import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class ServerFolderDeletedResponse {
  @Field(() => ID)
  serverId: string

  @Field(() => ID)
  folderId: string
}
