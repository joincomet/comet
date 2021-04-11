import { Field, ID, ObjectType } from 'type-graphql'
import { Folder } from '@/entity'

@ObjectType()
export class ServerFolderResponse {
  @Field(() => ID)
  serverId: string

  @Field(() => Folder)
  folder: Folder
}
