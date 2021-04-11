import { Field, ID, ObjectType } from 'type-graphql'
import { Folder } from '@/entity'

@ObjectType()
export class ServerFolderDeletedResponse {
  @Field(() => ID)
  serverId: string

  @Field(() => ID)
  folderId: string
}
